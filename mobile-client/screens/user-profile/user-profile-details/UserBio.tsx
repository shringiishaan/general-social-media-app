import * as React from "react"
import { Button, Icon } from "@rneui/base"
import { View, Text, Linking, Pressable } from "react-native"
import { typography } from "../../../styles/Typography"
import { colorsLight } from "../../../styles/Colors"
import { Dispatch } from "react"
import { bioStyles } from "./UserProfileDetailsStyles"
import { NavigationProp } from "@react-navigation/native"
import { IChat, IUser } from "../../../services/interfaces"
import { APIService } from "../../../services/api.service"
import { useAppContext } from "../../../services/context/AppContext"

type UserBioProps = {
    isFollowed: boolean;
    setIsFollowed: Dispatch<React.SetStateAction<boolean>>;
    navigation: NavigationProp<any>;
    userProfile: IUser
};

export function UserBio({
    isFollowed,
    setIsFollowed,
    navigation,
    userProfile
}: UserBioProps) {

    const { appState: { user } } = useAppContext();
    if (!user) return <></>
    const isMyUserProfile: boolean = Boolean(userProfile) && Boolean(userProfile.id === user.id)

    const url = "https://www.google.co.in/"

    return (
        <View style={bioStyles.container}>
            <Text style={bioStyles.bioHeading}>
                Giving serendipity a chance!
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                    style={[
                        typography.labelSmall,
                        colorsLight.textOnBackground,
                        { opacity: 0.75, marginBottom: 4 },
                    ]}>
                    St. Anthony Convent School
                </Text>
            </View>

            <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
                onPress={() => Linking.openURL(url)}>
                <Text style={bioStyles.bioUrlText}>{url.replace("https://", "")}</Text>
            </Pressable>

            {(!isMyUserProfile) && (
                <View
                    style={{
                        flex: 1,
                        marginTop: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                    <Button
                        buttonStyle={[
                            isFollowed
                                ? colorsLight.backgroundPrimary
                                : colorsLight.backgroundTertiaryContainer,
                            {
                                height: 40
                            }
                        ]}
                        containerStyle={{
                            flex: 1
                        }}
                        titleStyle={[
                            isFollowed
                                ? colorsLight.textOnPrimary
                                : colorsLight.textOnTertiaryContainer,
                            typography.labelLarge,
                        ]}
                        radius={"xl"}
                        onPress={() => setIsFollowed(!isFollowed)}>
                        {!isFollowed ? "Followed" : "Follow"}
                    </Button>
                    <Button
                        buttonStyle={
                            !isFollowed
                                ? colorsLight.backgroundPrimary
                                : colorsLight.backgroundSecondaryContainer
                        }
                        containerStyle={{ flex: 1, marginLeft: 8 }}
                        titleStyle={[
                            !isFollowed
                                ? colorsLight.textOnPrimary
                                : colorsLight.textOnSecondaryContainer,
                            typography.labelLarge,
                        ]}
                        radius={"xl"}>
                        Tap
                    </Button>
                    {isMyUserProfile && (
                        <Button
                            buttonStyle={{
                                ...colorsLight.backgroundPrimary,
                                height: 40
                            }}
                            containerStyle={{ flex: 1, marginLeft: 2 }}
                            titleStyle={[
                                typography.labelLarge,
                            ]}
                            radius={"xl"}
                            onPress={() => {
                                navigation.navigate("EditProfileScreen")
                            }}>
                            Edit Profile
                        </Button>
                    )}
                    {!isMyUserProfile && (
                        <Button
                            buttonStyle={{
                                ...colorsLight.backgroundPrimary,
                                height: 40
                            }}
                            containerStyle={{
                                flex: 1, marginLeft: 2
                            }}
                            titleStyle={[
                                typography.labelLarge,
                            ]}
                            radius={"xl"}
                            onPress={() => {
                                navigation.navigate("ChatViewScreen", {
                                    otherUserId: userProfile.id,
                                    chatId: null
                                })
                            }}>
                            <Icon name="chat" type="entypo" size={16} color={colorsLight.textOnPrimary.color} />
                        </Button>
                    )}
                </View>
            )}
        </View>
    )
}
