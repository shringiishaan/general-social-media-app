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
import { colorsLight } from "../../../styles/Colors"
import { typography } from "../../../styles/Typography"
import { borderRadius } from "../../../styles/Radius"
import { Button, ButtonGroup, Icon } from "@rneui/base"
import { IChat } from "../../../services/interfaces"
import { Spinner } from "../../common/Spinner"
import { ChatAPIService } from "../../../services/chat-api.service"
import { NavigationProp } from "@react-navigation/native"

type ChatsListScreenProps = {
    navigation: NavigationProp<any>
    route: any
}

export const ChatsListScreen: React.FC<ChatsListScreenProps> = ({ navigation }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)
    const [chats, setChats] = React.useState<IChat[]>([])

    const loadChats = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            setError(null)
            ChatAPIService.getMyChats().then((chats: IChat[]) => {
                setChats(chats)
                setLoading(false)
                resolve()
            }).catch((error) => {
                console.error(error)
                setError(error)
                setLoading(false)
                reject(error)
            })
        })
    }

    React.useEffect(() => {
        setLoading(true)
        loadChats().catch(console.error)
    }, [])


    if (loading) return <Spinner backgroundColor="#f4f4f4" />
    if (error) return (
        <View
            style={ {
                flex: 1,
                backgroundColor: "#f4f4f4",
                alignItems: "center",
                justifyContent: "center",
                display: "flex"
            } }>
            <Button
                type='clear'
                style={ {} }
                onPress={ () => { loadChats() } }>
                <Text>Retry</Text>
            </Button>
        </View>
    )

    if (!chats || chats.length === 0) return (
        <View
            style={ {
                flex: 1,
                backgroundColor: "#f4f4f4",
                alignItems: "center",
                justifyContent: "center",
                display: "flex"
            } }>
            <Text>
                No Chats
            </Text>
            <Button
                type='clear'
                onPress={ () => { loadChats() } }>
                <Text>Retry</Text>
            </Button>
        </View>
    )


    return (
        // Temoprary Screen Done
        <SafeAreaView style={ styles.container }>
            <View
                style={ [
                    {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 8,
                    },
                ] }
            >
                <View style={ [{ flexDirection: "row", alignItems: "center" }] }>
                    <Text style={ [typography.titleLarge, { marginLeft: 20 }] }>
                        My Taps
                    </Text>
                </View>

                <View style={ [{ flexDirection: "row" }] }>
                    <Button type="clear">
                        <Icon name="camera" type="feather" />
                    </Button>
                    <Button type="clear">
                        <Icon name="edit" type="font-awesome" />
                    </Button>
                </View>
            </View>

            <View
                style={ {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 16,
                } }
            >
                <View style={ { position: "relative", flexGrow: 1, marginRight: 16 } }>
                    <TextInput
                        placeholder="Search"
                        style={ [
                            colorsLight.SurfaceContainer,
                            typography.titleMedium,
                            borderRadius.md,
                            { flexGrow: 1, paddingHorizontal: 8, paddingLeft: 40 },
                        ] }
                    />
                    <View style={ { position: "absolute", top: 12, left: 10 } }>
                        <Icon name="search" type="material" size={ 20 } />
                    </View>
                </View>

                <Button type="clear" containerStyle={ [borderRadius.lg] }>
                    <Icon name="filter-list" type="material" color={ "#001f25" } />
                </Button>
            </View>

            <ButtonGroup
                selectedButtonStyle={ colorsLight.backgroundTertiaryContainer }
                buttonStyle={ [
                    colorsLight.SurfaceContainer,
                    borderRadius.lg,
                    {
                        marginHorizontal: 8,
                        overflow: "hidden",
                        height: 40,
                    },
                ] }
                textStyle={ colorsLight.textOnTertiaryContainer }
                containerStyle={ [{ borderWidth: 0 }] }
                innerBorderStyle={ { width: 0 } }
                buttons={ [
                    <Text
                        key={ "1" }
                        style={
                            selectedIndex === 0
                                ? colorsLight.textOnSurface
                                : colorsLight.outlineVariant
                        }
                    >
                        Taps
                    </Text>,
                    <Text
                        key={ "2" }
                        style={
                            selectedIndex === 1
                                ? colorsLight.textOnSurface
                                : colorsLight.outlineVariant
                        }
                    >
                        Request
                    </Text>,
                    <Text
                        key={ "3" }
                        style={
                            selectedIndex === 2
                                ? colorsLight.textOnSurface
                                : colorsLight.outlineVariant
                        }
                    >
                        Daily Taps
                    </Text>,
                ] }
                selectedIndex={ selectedIndex }
                onPress={ setSelectedIndex }
            ></ButtonGroup>

            <ScrollView contentContainerStyle={ { paddingBottom: 30, paddingTop: 10 } }>
                { chats.map((chat: IChat) => (
                    <View
                        style={ [
                            // styles.chatRowContainer,
                            // colorsLight.backgroundPrimaryContainer,
                            borderRadius.xl,
                            { marginBottom: 8, marginHorizontal: 8, overflow: "hidden" },
                        ] }
                        key={ chat.id }
                    >
                        <Pressable
                            style={ ({ pressed }) => [
                                borderRadius.xl,
                                // Spacing.p4,
                                styles.chatRowContainer,
                                {
                                    // padding: 16,
                                    transform: pressed ? [{ scale: 0.99 }] : [{ scale: 1 }],
                                },
                            ] }
                            android_ripple={ {
                                borderless: true,
                                color: "#191c1915",
                                foreground: true,
                            } }
                            onPress={ () => {
                                navigation.navigate("ChatViewScreen", {
                                    otherUserId: null,
                                    chatId: chat.id
                                })
                            } }>
                            <View style={ styles.chatRowImageContainer }>
                                <Image
                                    style={ [styles.chatRowImage] }
                                    source={ require("../../../assets/demo/event-1.jpg") }
                                />
                            </View>

                            <View
                                style={ [
                                    styles.chatRowCenterContainer,
                                    // { width: "fit-content" },
                                ] }
                            // activeOpacity={0.75}
                            >
                                <Text style={ [typography.bodyMedium] }>
                                    { chat.groupName }
                                </Text>
                                <Text
                                    style={ [
                                        typography.labelMedium,
                                        colorsLight.textOnSurface,
                                        { opacity: 0.7 },
                                    ] }
                                >
                                    3 Unread Messages
                                </Text>
                            </View>

                            <View
                                style={ [
                                    styles.chatRowRightContainer,
                                    {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginLeft: 8,
                                    },
                                ] }
                            >
                                <View
                                    style={ [
                                        colorsLight.backgroundPrimary,
                                        borderRadius.full,
                                        { width: 10, height: 10, marginRight: 8 },
                                    ] }
                                />
                                <Pressable
                                    android_ripple={ {
                                        color: "#33333333",
                                        borderless: false,
                                        foreground: true,
                                        radius: 16,
                                    } }
                                    style={ {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    } }
                                >
                                    <F2Icon.default name="more-vertical" size={ 18 } color="#333" />
                                </Pressable>
                            </View>
                        </Pressable>
                    </View>
                )) }
            </ScrollView>
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
