import * as React from "react"
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,

} from "react-native"
import { APIService } from "../../../services/api.service"
import { NavigationProp } from "@react-navigation/native"
import { Spinner } from "../../common/Spinner"
import { IAppLocation, ILanguage, IMapPin, IUserEducation } from "../../../services/interfaces"
import { Spacing } from "../../../styles/Spacing"
import { editInterestTabsSectionStyles } from "../user-interests/edit-interest-screen/EditIntersetsScreenStyles"
import { interestedInStyles } from "../../../styles/profile-styles/interestedInCard"
import { Button, Icon } from "@rneui/themed"
import { MyColors } from "../../../services/ColorsContants"
import { useAppContext } from "../../../services/context/AppContext"

type EditMyMapPinsScreenProps = {
    navigation: NavigationProp<any>
}

export const EditMyMapPinsScreen: React.FC<EditMyMapPinsScreenProps> = ({ navigation }) => {

    const { appState: { user } } = useAppContext();
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)
    const [myMapPins, setMyMapPins] = React.useState<IMapPin[]>([])
    const [otherMapPins, setOtherMapPins] = React.useState<IMapPin[]>([])
    const [otherAppLocations, setOtherAppLocations] = React.useState<IAppLocation[]>([])

    if (!user) {
        return <></>
    }

    const loadAllAppLocations = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            setError(null)
            APIService.getAllAppLocations().then((appLocations: IAppLocation[]) => {
                APIService.getAllMapPins().then(({ allMapPins, myMapPins }) => {
                    const myMapPinsIds: number[] = myMapPins.map(p => p.id)
                    const otherMapPins: IMapPin[] = allMapPins.filter(p => !myMapPinsIds.includes(p.id))
                    setOtherMapPins(otherMapPins)
                    setOtherAppLocations(appLocations.filter(l => !l.mapPin))
                    setMyMapPins(myMapPins)
                    setLoading(false)
                    resolve()
                }).catch((error) => {
                    setError(error)
                    setLoading(false)
                    reject(error)
                })
            }).catch((error) => {
                setError(error)
                setLoading(false)
                reject(error)
            })
        })
    }

    React.useEffect(() => {
        setLoading(true)
        loadAllAppLocations().catch(console.error)
        const intervalId = setInterval(() => {
            loadAllAppLocations().catch(console.error)
        }, 5000)
        return () => clearInterval(intervalId)
    }, [])

    const leavePin = (mapPinId: number) => {
        APIService.leavePin(mapPinId).then(() => {
            loadAllAppLocations().catch(console.error)
        }).catch(console.error)
    }

    const joinPin = (mapPinId: number) => {
        APIService.joinPin(mapPinId).then(() => {
            loadAllAppLocations().catch(console.error)
        }).catch(console.error)
    }

    const createPinAndJoin = (appLocation: IAppLocation) => {
        APIService.createPinAndJoin(appLocation).then((newMapPin: IMapPin) => {
            console.log(newMapPin)
            loadAllAppLocations().catch(console.error)
        }).catch(console.error)
    }

    const loadContent = () => {
        if (loading) {
            return <Spinner />
        }
        if (error) {
            return <Text>{error}</Text>
        }
        return (
            <ScrollView>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginTop: 0,
                        marginBottom: 10,
                        paddingHorizontal: 6,
                        color: "#707070"
                    }}>
                    My Pins
                </Text>
                <View style={styles.tagContainer}>
                    {myMapPins.map((mapPin: IMapPin, index: number) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tag, {
                                backgroundColor: MyColors.PRIMARY,
                            }]}
                            onPress={() => {
                                leavePin(mapPin.id)
                            }}>
                            <Text
                                style={{
                                    color: "#fff",
                                }}>
                                {mapPin.name} ({mapPin.usersCount})
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginTop: 20,
                        marginBottom: 10,
                        paddingHorizontal: 6,
                        color: "#707070"
                    }}>
                    Popular Pins
                </Text>
                <View style={styles.tagContainer}>
                    {otherMapPins.map((mapPin: IMapPin, index: number) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tag, {
                                backgroundColor: "#e4e4e4",
                            }]}
                            onPress={() => {
                                joinPin(mapPin.id)
                            }}>
                            <Text>{mapPin.name} ({mapPin.usersCount})</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginTop: 20,
                        marginBottom: 10,
                        paddingHorizontal: 6,
                        color: "#707070"
                    }}>
                    Other Pins
                </Text>
                <View style={styles.tagContainer}>
                    {otherAppLocations.map((appLocation: IAppLocation, index: number) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tag, {
                                backgroundColor: "#e4e4e4",
                            }]}
                            onPress={() => {
                                createPinAndJoin(appLocation)
                            }}>
                            <Text>{appLocation.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        )
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingHorizontal: 5,
                    marginTop: 10,
                    marginBottom: 20,
                }}>
                <Button
                    type='clear'
                    onPress={() => {
                        navigation.goBack()
                    }}
                    icon={
                        <Icon
                            name="arrow-back"
                            color={"#707070"} />
                    }
                />
                <Text
                    style={{
                        marginLeft: 6,
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#707070",
                    }}>
                    Edit My Pins
                </Text>
            </View>
            {loadContent()}
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f4f4f4",
        color: "#333",
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
        display: "flex",
        flexDirection: "column",
    },
    tagContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "transparent"
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: "#fff",
        borderRadius: 15,
        display: "flex",
        cursor: "pointer",
    },
    categoryTitle: {
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 5,
    },
})