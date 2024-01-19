import * as React from "react"
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    Pressable,
    TouchableOpacity,
    View,
    Text
} from "react-native"
import * as FIcon from "react-native-vector-icons/FontAwesome"
import * as F2Icon from "react-native-vector-icons/Feather"
import * as IIcon from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../services/context/AppContext"

export function ExploreScreen({ navigation }: any) {

    const { appState: { user } } = useAppContext()
    const stories = [{
        userName: "Maddy Dubey",
        imageName: "event-1.jpg"
    }, {
        userName: "Sachin Sharma",
        imageName: "event-3-3.jpg"
    }, {
        userName: "Vikas Khanna",
        imageName: "event-4.jpg"
    }, {
        userName: "Neha Wadhwani",
        imageName: "event-3-5.jpg"
    }]

    return (
        <SafeAreaView
            style={ styles.container }>
            <ScrollView
                bounces={ true }
                horizontal={ true }
                alwaysBounceHorizontal={ true }
                style={ styles.storiesBar }
                contentContainerStyle={ styles.storiesBarContainer }>
                <View style={ styles.storyBox }>
                    <View style={ [styles.storyCircleUnseenInvisible] }>
                        <View style={ [
                            styles.storyCircle, {
                                backgroundColor: "#eee",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }] }>
                            <FIcon.default
                                name='camera'
                                size={ 24 }
                                color='#666'
                            />
                        </View>
                    </View>
                    <Text numberOfLines={ 1 } style={ styles.storyText }>Add Story</Text>
                </View>
                { [...stories, ...stories].map((story, index) => (
                    <View
                        key={ index }
                        style={ styles.storyBox }>
                        <Pressable
                            android_ripple={ {
                                color: "#33333333",
                                borderless: false,
                                radius: StoryCircleSize / 2,
                                foreground: true
                            } }
                            style={ [(index % 3 === 2) ? styles.storyCircleUnseenInvisible : styles.storyCircleUnseen] }>
                            <View style={ [styles.storyCircle] }>
                                <Image
                                    style={ styles.storyImage }
                                    source={ require("../assets/demo/event-3.jpg") }
                                />
                            </View>
                        </Pressable>
                        <Text numberOfLines={ 1 } style={ styles.storyText }>{ story.userName }</Text>
                    </View>
                )) }
            </ScrollView>
        </SafeAreaView>
    )
}

const StoryBoxWidth: number = 84
const StoryCircleSize: number = 60
const StoryCircleUnseenOffset: number = 8

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        alignItems: "stretch",
        justifyContent: "flex-start",
        backgroundColor: "#fff"
    },
    storiesBar: {
        flex: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#eee"
    },
    storiesBarContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    storyBox: {
        flex: 1,
        alignItems: "center",
        minWidth: StoryBoxWidth,
        maxWidth: StoryBoxWidth,
    },
    storyCircle: {
        height: StoryCircleSize,
        width: StoryCircleSize,
        borderRadius: StoryCircleSize,
        overflow: "hidden",
        elevation: 4
    },
    storyCircleUnseen: {
        height: StoryCircleSize + StoryCircleUnseenOffset,
        width: StoryCircleSize + StoryCircleUnseenOffset,
        borderRadius: StoryCircleSize + StoryCircleUnseenOffset,
        borderWidth: 2,
        borderColor: "blue",
        alignItems: "center",
        justifyContent: "center"
    },
    storyCircleUnseenInvisible: {
        height: StoryCircleSize + StoryCircleUnseenOffset,
        width: StoryCircleSize + StoryCircleUnseenOffset,
        borderRadius: StoryCircleSize + StoryCircleUnseenOffset,
        borderWidth: 4,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    storyImage: {
        resizeMode: "stretch",
        height: StoryCircleSize,
        width: StoryCircleSize,
    },
    storyText: {
        marginTop: 8
    },

    mainContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    mainContentContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    postBox: {
        flex: 1,
        flexDirection: "column",
        paddingBottom: 30,
    },
    postHeader: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    postHeaderImage: {
        height: 40,
        width: 40,
        borderRadius: 40,
        resizeMode: "cover"
    },
    postHeaderUsernameContainer: {
        paddingLeft: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    postHeaderActionContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-end",
    },
    postImageContainer: {
        flex: 1,
    },
    postImage: {
        flex: 1,
        resizeMode: "cover"
    },

    postFooterContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingTop: 4
    },
    postCommentContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    postCommentText: {
        marginBottom: 2,
    },
    postCommentUsername: {
        fontWeight: "600",
        marginRight: 4,
    },

    postFooterActionContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 6,
        paddingBottom: 10,
        paddingLeft: 6,
        paddingRight: 8
    },
    postFooterActionLeftBox: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    postFooterActionRightBox: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
})
