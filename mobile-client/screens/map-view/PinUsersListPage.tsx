import * as React from "react"
import {
	Image,
	SafeAreaView,
	StyleSheet,
	StatusBar,
	ScrollView,
	Pressable,
	View,
	Text,
	TextInput,
} from "react-native"
import * as F2Icon from "react-native-vector-icons/Feather"
import { Button, ButtonGroup, Icon } from "@rneui/base"
import { borderRadius } from "../../styles/Radius"
import { typography } from "../../styles/Typography"
import { colorsLight } from "../../styles/Colors"
import { IMapPin, IUser } from "../../services/interfaces"
import { APIService } from "../../services/api.service"
import { Spinner } from "../common/Spinner"

type PinUsersListPageProps = {
    route: any
    navigation: any
}

export const PinUsersListPage: React.FC<PinUsersListPageProps> = ({route, navigation}) => {

    const mapPinId: number = route.params.mapPinId
    const [mapPin, setMapPin] = React.useState<IMapPin>()
    const [users, setUsers] = React.useState<IUser[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)

    const loadAllData = () => {
        return new Promise<void>((resolve, reject) => {
            setLoading(true)
            setError(null)
            console.log("loading map pin : ", mapPinId)
            APIService.getMapPinById(mapPinId).then((mapPin: IMapPin) => {
                console.log("map pin : ", mapPin)
                APIService.getAllUsersByMapPinId(mapPinId).then((users: IUser[]) => {
                    console.log("got users : ", users?.length)
                    setLoading(false)
                    setMapPin(mapPin)
                    setUsers(users)
                    resolve()
                }).catch((error: string) => {
                    console.error(error)
                    setError(error.toString())
                    setLoading(false)
                    reject(error)
                })
            }).catch((error: string) => {
                console.error(error)
                setError(error.toString())
                setLoading(false)
                reject(error)
            })
        })
    }

    const loadPinUsers = () => {
        return new Promise((resolve, reject) => {
            setError(null)
            APIService.getAllUsersByMapPinId(mapPinId).then((users: IUser[]) => {
                setUsers(users)
                setLoading(false)
                resolve(users)
            }).catch((error: string) => {
                setError(error)
                setLoading(false)
                reject(error)
            })
        })
    }

    React.useEffect(() => {
        setLoading(true)
        loadAllData().catch(console.error)
        const intervalId = setInterval(() => {
            loadPinUsers().catch(console.error)
        }, 5000)
        return () => clearInterval(intervalId)
    }, [])

    const DrawContent = () => {
        if(loading) {
            return (
                <Spinner />
            )
        }
        if(error) {
            return (
                <View>
                    <Text>{error}</Text>
                </View>
            )
        }
        return (
            <View>
                <ScrollView contentContainerStyle={{ paddingBottom: 30, paddingTop: 10 }}>
                    {users.map((user: IUser) => (
                        <View
                            style={[
                                // styles.chatRowContainer,
                                // colorsLight.backgroundPrimaryContainer,
                                borderRadius.xl,
                                { marginBottom: 8, marginHorizontal: 8, overflow: "hidden" },
                            ]}
                            key={user.id}>
                            <Pressable
                                style={({ pressed }) => [
                                    borderRadius.xl,
                                    styles.chatRowContainer, {
                                        transform: pressed ? [{ scale: 0.99 }] : [{ scale: 1 }],
                                    },
                                ]}
                                android_ripple={{
                                    borderless: true,
                                    color: "#191c1915",
                                    foreground: true,
                                }}
                                onPress={() => {
                                    navigation.navigate("ProfileDetailsScreen", { user: user })
                                }}>
                                <View style={styles.chatRowImageContainer}>
                                    <Image
                                        style={[styles.chatRowImage]}
                                        source={require("../../assets/demo/event-1.jpg")}
                                    />
                                </View>

                                <View
                                    style={[
                                        styles.chatRowCenterContainer,
                                    ]}>
                                    <Text style={[typography.bodyMedium]}>
                                        {user.firstName} {user.lastName}
                                    </Text>
                                    <Text
                                        style={[
                                            typography.labelMedium,
                                            colorsLight.textOnSurface,
                                            { opacity: 0.7 },
                                        ]}>
                                        3 Unread Messages
                                    </Text>
                                </View>

                                <View
                                    style={[ styles.chatRowRightContainer, {
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginLeft: 8,
                                        },
                                    ]}>
                                    <View
                                        style={[
                                            colorsLight.backgroundPrimary,
                                            borderRadius.full,
                                            { width: 10, height: 10, marginRight: 8 },
                                        ]}/>
                                    <Pressable
                                        android_ripple={{
                                            color: "#33333333",
                                            borderless: false,
                                            foreground: true,
                                            radius: 16,
                                        }}
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                        <F2Icon.default name="more-vertical" size={18} color="#333" />
                                    </Pressable>
                                </View>
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
            </View>
        )
    }
    
    if(!mapPinId) {
        return <></>
    }

	return (
		<SafeAreaView style={styles.container}>
            <View
                style={[
                    {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 8,
                    },
                ]}
            >
                <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                    <Button
                        type="clear"
                        containerStyle={[
                            // colorsLight.SurfaceContainerHigh,
                            borderRadius.lg,
                            { marginRight: 6 },
                        ]}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Icon name="arrow-back" type="material" />
                    </Button>
                    <Text style={[typography.titleLarge]}>
                        {mapPin?.name || "Loading Pin"}
                    </Text>
                </View>
            </View>
            <DrawContent />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
		paddingTop: StatusBar.currentHeight,
		backgroundColor: "#fff",
	},
	header: {
		paddingHorizontal: 23,
		paddingTop: 20,
		paddingBottom: 8,
	},
	headerText: {
		fontSize: 22,
		fontWeight: "700",
		color: "blue",
	},
	chatRowContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		paddingVertical: 10,
		// paddingHorizontal: 8,
	},
	chatRowImageContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	chatRowImage: {
		height: 50,
		width: 50,
		borderRadius: 100,
	},
	chatRowCenterContainer: {
		flex: 1,
		paddingLeft: 2,
	},
	chatRowRightContainer: {
		paddingRight: 20,
	},
})
