import * as React from "react"
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native"
import { ChatAPIService } from "../../../services/chat-api.service"
import { useAppContext } from "../../../services/context/AppContext"
import { NavigationProp } from "@react-navigation/native"
import { Spinner } from "../../common/Spinner"
import { IChat, IChatMessage } from "../../../services/interfaces"
import { Button, Icon, Input } from "@rneui/themed"
import { LogBox } from "react-native"
LogBox.ignoreLogs(["Warning: ..."]) // Ignore log notification by message
LogBox.ignoreAllLogs()

type ChatViewScreenProps = {
    navigation: NavigationProp<any>
    route: any
}

export const ChatViewScreen: React.FC<ChatViewScreenProps> = ({ navigation, route }) => {

    const { appState: { user, chats }, setChats } = useAppContext()
    const otherUserId: number | null = route.params?.otherUserId
    const chatId: number | null = route.params?.chatId
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)
    const [chat, setChat] = React.useState<IChat | null>(null)
    const [messages, setMessages] = React.useState<IChatMessage[]>([])
    const [message, setMessage] = React.useState<string>("")
    const [selectedMessageId, setSelectedMessageId] = React.useState<number | null>(null)
    const [optionVisible, setOptionVisible] = React.useState<boolean | null>(false)



    React.useEffect(() => {
        setLoading(true)
        loadChat()
    }, [])

    const loadChat = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            setError(null)
            if (chatId) {
                ChatAPIService.getChat(chatId).then((chat: IChat) => {
                    setChat(chat)
                    // setChats([chat])
                    setLoading(false)
                    resolve()
                }).catch((error) => {
                    setError(error)
                    reject(error)
                    setLoading(false)
                })
                ChatAPIService.getMessagesByChat(chatId).then((messages: IChatMessage[]) => {
                    setMessages(messages)
                    // console.log(messages.filter((message) => message.createTime))
                    setLoading(false)
                    resolve()
                }).catch((error) => {
                    setError(error)
                    reject(error)
                    setLoading(false)
                })
            } else if (otherUserId) {
                ChatAPIService.getOrCreateChatWithUserId(otherUserId).then((chat: IChat) => {
                    setChat(chat)
                    setLoading(false)
                    resolve()
                }).catch((error) => {
                    setError(error)
                    reject(error)
                    setLoading(false)
                })
            } else console.error("No chatId or otherUserId provided")
        })
    }

    if (!user) return <></>
    if (loading) return <Spinner />

    const onMessagePress = (messageId: number): void => {
        setSelectedMessageId((prevId) => (prevId === messageId ? null : messageId))
    }

    const createMessage = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            setError(null)
            if (chat) {
                ChatAPIService.createMessage(chat.id, message).then((message: IChatMessage) => {
                    setMessages([...messages, message])
                    setMessage("")
                    resolve()
                }).catch((error) => {
                    setError(error)
                    reject(error)
                })
            } else {
                reject()
            }
        })
    }

    if (!user) {
        return <></>
    }
    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <Text>{ error }</Text>
    }

    return (
        <View style={ styles.container }>
            <View
                style={ {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingHorizontal: 5,
                    marginTop: 10,
                    marginBottom: 20,
                } }>
                <Button
                    type='clear'
                    onPress={ () => {
                        navigation.goBack()
                    } }
                    icon={
                        <Icon
                            name="arrow-back"
                            color={ "#707070" } />
                    }
                />
                <Text
                    style={ {
                        marginLeft: 6,
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#707070",
                    } }>
                    { chat?.groupName }
                </Text>
            </View>
            <ScrollView
                style={ {
                    flex: 1,
                    backgroundColor: "#f4f4f4",
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 0,
                    marginHorizontal: 4
                } }
                showsHorizontalScrollIndicator={ false }
                showsVerticalScrollIndicator={ false }
            >
                { messages.map((message: IChatMessage, index: number) => {
                    return (
                        <>
                            <View
                                key={ index }
                                style={ {
                                    display: "flex",
                                    // flexDirection: "row",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                    marginBottom: 20,
                                } }>
                                <View
                                    style={ {
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        backgroundColor: "#bdeaf5",
                                        justifyContent: "flex-start",
                                        borderBottomEndRadius: 10,
                                        borderBottomStartRadius: 10,
                                        borderTopEndRadius: 10,
                                        padding: 15,
                                    } }>
                                    <TouchableOpacity onPress={ () => onMessagePress(message.id) }>
                                        <Text
                                            style={ {
                                                fontSize: 16,
                                                fontWeight: "bold",
                                                color: "#707070",
                                            } }>
                                            <Text>Name</Text>
                                            { message.sender?.firstName } { message.sender?.lastName }
                                        </Text>
                                        <Text
                                            style={ {
                                                fontSize: 16,
                                                color: "#707070",
                                            } }>
                                            <Text>Message</Text>
                                            { message.message }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                { selectedMessageId === message.id && (
                                    <Text style={ { fontSize: 14, color: "#707070", marginTop: 10 } }>
                                        { message.createTime.toLocaleString() }
                                    </Text>
                                ) }
                            </View>
                            {/* temporary chat container for user message */ }
                            <View
                                key={ index }
                                style={ {
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-end",
                                    marginBottom: 20,
                                } }>
                                <View
                                    style={ {
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        justifyContent: "flex-start",
                                        backgroundColor: "#e2e3de",
                                        borderBottomEndRadius: 10,
                                        borderBottomStartRadius: 10,
                                        borderTopStartRadius: 10,
                                        padding: 15,
                                    } }>
                                    <Text
                                        style={ {
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: "#707070",
                                        } }>
                                        <Text>Name</Text>
                                        { message.sender?.firstName } { message.sender?.lastName }
                                    </Text>
                                    <Text
                                        style={ {
                                            fontSize: 16,
                                            color: "#707070",
                                        } }>
                                        <Text>Message RNCSafeAreaProvider ThemeProvider AppProvider</Text>

                                    </Text>
                                </View>
                            </View>
                        </>
                    )
                }) }
            </ScrollView>
            <View style={ {
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
                height: 60,
                marginTop: 10,
                backgroundColor: "#fff",
                borderRadius: 20,
            } }>
                <View style={ {
                    width: "10%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderBottomStartRadius: 20,
                } }>
                    <Icon
                        name="attachment"
                        type='FontAwesome5'
                        color="#ccc"
                        onPress={ () => {
                            setOptionVisible((prev) => (prev === null ? true : !prev))
                        } }
                    />
                    <View style={ styles.optionContainer }>
                        { optionVisible && (
                            <View style={ styles.option }>
                                <Icon
                                    raised
                                    name='file'
                                    type='font-awesome'
                                    color='#f50'
                                    size={ 20 }
                                    onPress={ () => console.log("hello") } />
                                <Icon
                                    raised
                                    name='image'
                                    type='font-awesome'
                                    size={ 20 }
                                    color='#f50'
                                    onPress={ () => console.log("hello") } />
                            </View>
                        ) }
                    </View>
                </View>
                <Input
                    value={ message }
                    onChangeText={ setMessage }
                    placeholder="Type your message here..."
                    containerStyle={ { flex: 1, marginLeft: 10, marginTop: 10 } }
                    style={ {
                        lineHeight: 20,
                        fontSize: 18,
                        color: "#666",
                        marginTop: 7,
                        flex: 1,
                    } }
                    inputContainerStyle={ {
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        borderBottomWidth: 0,
                    } }
                />
                <View style={ {
                    width: "10%",
                    height: 60,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                } }>
                    <Icon
                        name="send"
                        type='FontAwesome5'
                        color="#ccc"
                        onPress={ () => {
                            createMessage()
                        } }
                    />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f4f4f4",
        color: "#333",
        flex: 1,
        paddingHorizontal: 6,
        paddingTop: 30,
        paddingBottom: 10,
        display: "flex",
        flexDirection: "column",
    },
    optionContainer: {
        position: "absolute",
        marginLeft: 10,
        marginRight: 10,
        bottom: 50,
        left: -15,
        width: "200%",
        alignItems: "center",
        zIndex: 1,
    },
    option: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tagContainer: {
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "lavender"
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: "#fff",
        flexDirection: "row",
        borderRadius: 15,
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "space-between",

    },
    categoryTitle: {
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 5,
    },
})