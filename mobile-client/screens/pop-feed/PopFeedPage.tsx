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
import * as AntIcon from "react-native-vector-icons/AntDesign"
import * as F5Icon from "react-native-vector-icons/FontAwesome5"
import { Button, ButtonGroup, Icon as RNIcon } from "@rneui/base"
import { borderRadius } from "../../styles/Radius"
import { typography } from "../../styles/Typography"
import { colorsLight } from "../../styles/Colors"
import Icon from "react-native-vector-icons/FontAwesome"
import { Card } from "@rneui/themed"
import {useState} from "react"
import { MyColors } from "../../services/ColorsContants"
import { NavigationProp, useFocusEffect } from "@react-navigation/native"
import { IPop } from "../../services/interfaces"
import { PopsAPIService } from "../../services/pops-api.service"
import { Spinner } from "../common/Spinner"
import { Colors } from "react-native/Libraries/NewAppScreen"
import moment from "moment"

type PopFeedPageProps = {
    navigation: NavigationProp<any>
}

export const PopFeedPage: React.FC<PopFeedPageProps> = ({ navigation }) => {

    const [popsList, setPopsList] = useState<IPop[]>()
    const [loader, setLoader] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    const loadPops = () => {
        return new Promise<void>((resolve, reject) => {
            setError("")
            PopsAPIService.getAllPops().then((pops: IPop[]) => {
                setPopsList(pops)
                resolve()
            }).catch(reject)
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            setLoader(true)
            loadPops().then(() => {
                setLoader(false)
            }).catch((e) => {
                console.error(e)
                setError("Failed to fetch pops")
                setLoader(false)
            })
        }, [])
    )

    const DrawMainContent = () => {
        if(loader) {
            return (
                <View
                    style={{
                        flex: 1
                    }}>
                    <Spinner />
                </View>
            )
        }
        if(error) {
            return (
                <View  
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Text 
                        style={{
                            color: MyColors.DANGER
                        }}>
                        {error}
                    </Text>
                </View>
            )
        }
        if(!popsList || popsList.length < 1) {
            return (
                <View
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Text 
                        style={{
                            color: MyColors.SECONDARY
                        }}>
                        There are no pops to display
                    </Text>
                </View>
            )
        }
        return (
            <View>
                {popsList.map((pop: IPop, index: number) => (
                    <PopBox navigation={navigation} pop={pop} key={pop.id} />
                ))}
            </View>
        )
    }

	return (
		<SafeAreaView style={styles.container}>

			<PopFeedTopBar />

            <ScrollView 
                style={{
                }}
                contentContainerStyle={{ 
                    paddingBottom: 30, 
                    paddingTop: 10,
                }}>
                {DrawMainContent()}
            </ScrollView>
			
            <View style={styles.floatingBottomBox}>
                <Button
                    color={"#eee"}
                    icon={<Icon name="plus" color={"#333"} size={12} />}
                    iconContainerStyle={styles.floatingBtnIconContainerStyle}
                    onPress={() => {
                        navigation.navigate("CreateNewPopPage")
                    }}
                    buttonStyle={styles.plusButton}>
                    <Text style={styles.floatingBtnText}>
                        CREATE A NEW POP
                    </Text>
                </Button>
            </View>

		</SafeAreaView>
	)
}

const PopFeedTopBar: React.FC = () => {

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				padding: 16,
			}}
		>
			<View style={{ position: "relative", flexGrow: 1, marginRight: 16 }}>
				<TextInput
					placeholder="Search in Pops"
					style={[
						colorsLight.SurfaceContainer,
						typography.titleMedium,
						borderRadius.md,
						{ flexGrow: 1, paddingHorizontal: 8, paddingLeft: 40 },
					]}
				/>
				<View style={{ position: "absolute", top: 12, left: 10 }}>
					<RNIcon name="search" type="material" size={20} />
				</View>
			</View>

			<Button type="clear" containerStyle={[borderRadius.lg]}>
				<RNIcon name="filter-list" color={"#001f25"} />
			</Button>
		</View>
	)
}

type PopBoxProps = {
    pop: IPop
    navigation: NavigationProp<any>
}

const PopBox: React.FC<PopBoxProps> = ({ pop, navigation }) => {

    const [likesCount, setLikesCount] = useState<number>(0)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [comments, setComments] = useState<string[]>(["You're such an inspiration! I started skating because of you 🚀", "Me too! Keep going strong 💪", "Me three!"])
    const [currentComment, setCurrentComment] = useState<string>("")

    const handleLike = () => {
        if (isLiked) {
            setLikesCount(likesCount - 1)
        } else {
            setLikesCount(likesCount + 1)
        }
        setIsLiked(!isLiked)
    }

    const handleComment = () => {
        if (currentComment) {
            setComments([...comments, currentComment])
            setCurrentComment("")
        }
    }

	return (
		<View
			style={{ 
				paddingHorizontal: 10,
				paddingBottom: 10,
			}}>
			<Card
				containerStyle={{
					margin: 0,
					borderRadius: 10,
				}}>
                <View
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}>
                        <View 
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: 4,
                                marginRight: 8,
                            }}>
                            <Image
                                style={[styles.chatRowImage]}
                                source={require("../../assets/demo/event-1.jpg")}
                            />
                        </View>
                        <View
                            style={{
                                paddingLeft: 2,
                            }}>
                            <Text style={[typography.bodyMedium]}>
                                {pop.owner.firstName} {pop.owner.lastName}
                            </Text>
                            <Text
                                style={[
                                    typography.labelMedium,
                                    colorsLight.textOnSurface,
                                    { opacity: 0.7 },
                                ]}
                            >
                                {moment(pop.createTime).fromNow()}
                            </Text>
                            {/* <Text
                                style={[
                                    typography.labelMedium,
                                    colorsLight.textOnSurface,
                                    { opacity: 0.7 },
                                ]}
                            >
                                Software Engineer
                            </Text> */}
                        </View>
                    </View>
                    <View
                        style={[{
                            paddingRight: 8,
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: 8,
                        }]}>
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
                </View>
                <View
                    style={{
                        marginTop: 6
                    }}>
                    <View
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                            paddingHorizontal: 6
                        }}>
                        <Text
                            style={[
                                typography.bodyMedium,
                                colorsLight.textOnSurface,
                            ]}>
                            {pop.text}
                        </Text>
                    </View>
                </View>  
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#eee"
                    }}
                 />
                <View
                    style={{
                        marginTop: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 6,
                    }}>
                    <Pressable onPress={handleLike}>
                        <View 
                            style={{ 
                                flexDirection: "row", 
                                alignItems: "center", 
                            }}>
                            <AntIcon.default name={isLiked ? "like1" : "like2"} size={18} color="#666" />
                            <Text style={{ marginLeft: 8 }}>{likesCount} Likes</Text>
                        </View>
                    </Pressable>
                    <Pressable>
                        <View 
                            style={{ 
                                flexDirection: "row", 
                                alignItems: "center", 
                            }}>
                            <Icon name={"comment-o"} size={18} color="#666" />
                            <Text style={{ marginLeft: 8 }}>0 Comments</Text>
                        </View>
                    </Pressable>
                    <Pressable>
                        <View 
                            style={{ 
                                flexDirection: "row", 
                                alignItems: "center", 
                            }}>
                            <Icon name={"share"} size={18} color="#666" />
                            <Text style={{ marginLeft: 8 }}>Share</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                        <Image
                            style={{ 
                                width: 30, 
                                height: 30, 
                                borderRadius: 15, 
                                marginRight: 10 
                            }}
                            source={require("../../assets/demo/pop-travel-1.jpg")}
                        />
                        <TextInput 
                            value={currentComment}
                            onChangeText={setCurrentComment}
                            placeholder="Add a reply..."
                            style={{ 
                                flex: 1, 
                                borderWidth: 1, 
                                borderColor: "#eee", 
                                borderRadius: 5, 
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                height: 60,
                                marginRight: 10,
                            }}
                        />
                        <Pressable onPress={handleComment}>
                            <F2Icon.default name="send" size={20} color="#666" />
                        </Pressable>
                    </View>
                </View>
			</Card>
		</View>
	)
}

const PopBoxStyled: React.FC<PopBoxProps> = ({ pop, navigation }) => {

    const [likesCount, setLikesCount] = useState<number>(0)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [comments, setComments] = useState<string[]>(["You're such an inspiration! I started skating because of you 🚀", "Me too! Keep going strong 💪", "Me three!"])
    const [currentComment, setCurrentComment] = useState<string>("")

    const handleLike = () => {
        if (isLiked) {
            setLikesCount(likesCount - 1)
        } else {
            setLikesCount(likesCount + 1)
        }
        setIsLiked(!isLiked)
    }

    const handleComment = () => {
        if (currentComment) {
            setComments([...comments, currentComment])
            setCurrentComment("")
        }
    }

	return (
		<View
			style={{ 
				paddingHorizontal: 10,
				paddingBottom: 10,
			}}>
			<Card
				containerStyle={{
					margin: 0,
					borderRadius: 10,
				}}>
                <View
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 4,
                            marginRight: 8,
                        }}>
                            <Image
                                style={[styles.chatRowImage]}
                                source={require("../../assets/demo/event-1.jpg")}
                            />
                        </View>
                        <View
                            style={{
                                paddingLeft: 2,
                            }}>
                            <Text style={[typography.bodyMedium]}>
                                {pop.owner.firstName} {pop.owner.lastName}
                            </Text>
                            {/* <Text
                                style={[
                                    typography.labelMedium,
                                    colorsLight.textOnSurface,
                                    { opacity: 0.7 },
                                ]}
                            >
                                Software Engineer
                            </Text> */}
                        </View>
                    </View>
                    <View
                        style={[{
                            paddingRight: 8,
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: 8,
                        }]}>
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
                </View>
                <View
                    style={{
                        marginTop: 18,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 6,
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <F2Icon.default name="map-pin" size={18} color="#333" />
                        <Text
                            style={[
                                typography.bodyMedium,
                                colorsLight.textOnSurface,
                                { marginLeft: 4 },
                            ]}>
                            Bali, Indonesia
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <F2Icon.default name="map" size={18} color="#333" />
                        <Text
                            style={[
                                typography.bodyMedium,
                                colorsLight.textOnSurface,
                                { marginLeft: 4 },
                            ]}>
                            1.5km
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 6
                    }}>
                    <View>
                        <Image
                            style={{
                                height: 260,
                                width: "100%",
                                borderRadius: 10,
                                marginTop: 10,
                            }}
                            source={require("../../assets/demo/pop-travel-1.jpg")}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                        }}>
                        <Text
                            style={[
                                typography.bodyMedium,
                                colorsLight.textOnSurface,
                                { opacity: 0.7 },
                            ]}>
                            1 hour ago
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        <Text
                            style={[
                                typography.bodyMedium,
                                colorsLight.textOnSurface,
                            ]}>
                            Golden sands, azure waves, tranquil horizons. The beach whispers tales of timeless serenity. Natures embrace feels pure here.
                        </Text>
                    </View>
                </View>  
                <View
                    style={{
                        marginTop: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 6,
                    }}>
                    <Pressable onPress={handleLike}>
                        <View 
                            style={{ 
                                flexDirection: "row", 
                                alignItems: "center", 
                            }}>
                            <AntIcon.default name={isLiked ? "like1" : "like2"} size={18} color="#666" />
                            <Text style={{ marginLeft: 8 }}>{likesCount} Likes</Text>
                        </View>
                    </Pressable>
                    <Pressable>
                        <View 
                            style={{ 
                                flexDirection: "row", 
                                alignItems: "center", 
                            }}>
                            <Icon name={"comment-o"} size={18} color="#666" />
                            <Text style={{ marginLeft: 8 }}>0 Comments</Text>
                        </View>
                    </Pressable>
                    <Pressable>
                        <View 
                            style={{ 
                                flexDirection: "row", 
                                alignItems: "center", 
                            }}>
                            <Icon name={"share"} size={18} color="#666" />
                            <Text style={{ marginLeft: 8 }}>Share</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{ marginTop: 20 }}>
                    {comments.slice(0, 3).map((comment, index) => (  // Displaying only first 3 comments similar to reference image
                        <View key={index} style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 10,
                        }}>
                            <Image
                                style={{ 
                                    width: 30, 
                                    height: 30, 
                                    borderRadius: 15, 
                                    marginRight: 10 
                                }}
                                source={require("../../assets/demo/pop-travel-1.jpg")}
                            />
                            <Text 
                                style={{ 
                                    flex: 1,
                                    lineHeight: 22,
                                }}>
                                <Text style={{ fontWeight: "bold" }}>someusername&nbsp;</Text> 
                                {comment}
                            </Text>
                        </View>
                    ))}
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                        <Image
                            style={{ 
                                width: 30, 
                                height: 30, 
                                borderRadius: 15, 
                                marginRight: 10 
                            }}
                            source={require("../../assets/demo/pop-travel-1.jpg")}
                        />
                        <TextInput 
                            value={currentComment}
                            onChangeText={setCurrentComment}
                            placeholder="Add a comment..."
                            style={{ 
                                flex: 1, 
                                borderWidth: 1, 
                                borderColor: "#eee", 
                                borderRadius: 5, 
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                height: 60,
                                marginRight: 10,
                            }}
                        />
                        <Pressable onPress={handleComment}>
                            <F2Icon.default name="send" size={20} color="#666" />
                        </Pressable>
                    </View>
                </View>
			</Card>
		</View>
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
	chatRowImage: {
		height: 50,
		width: 50,
		borderRadius: 100,
	},
    
	plusButton: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ccc",
	},
	floatingBottomBox: { 
		position: "absolute", 
		bottom: 0, 
		left: 0, 
		padding: 20 
	},
	floatingBtnIconContainerStyle: { 
		marginLeft: 4
	},
	floatingBtnText: {
		marginLeft: 6, 
		fontSize: 14
	}
})
