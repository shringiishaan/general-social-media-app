import * as React from "react"
import { useState, useEffect } from "react"
import { Image, Text, View } from "react-native"
import { Icon } from "@rneui/base"
import { NavigationProp } from "@react-navigation/native"
import { APIService } from "../../../services/api.service"
import { Spinner } from "../../common/Spinner"
import { profileHeaderStyles } from "../../../styles/profile-styles/profileHeader"
import { typography } from "../../../styles/Typography"
import { colorsDark, colorsLight } from "../../../styles/Colors"
import { borderRadius } from "../../../styles/Radius"
import { IUser } from "../../../services/interfaces"

const userDefaultProfileImg = require("../../../assets/images/demo-image.jpg")
const tempImage: string =
    "https://images.unsplash.com/photo-1567694673713-c7bb11f143a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80"

type UserInfoSectionProps = {
    navigation: NavigationProp<any>;
    isFollowed: boolean;
    theme: string;
    userProfile: IUser
};

export function UserInfoSection({
    navigation,
    isFollowed,
    theme,
    userProfile
}: UserInfoSectionProps) {

    const [profileImgB64, setProfileImgB64] = useState<any | null>(null)
    const [profileImgLoading, setProfileImgLoading] = useState<boolean>(true)

    useEffect(() => {
        (async () => {
            setProfileImgLoading(false)
            if (userProfile && userProfile.avatarImageId) {
                setProfileImgLoading(true)
                const { imageBase64 } = await APIService.getImageBase64(
                    userProfile.avatarImageId
                )
                setProfileImgB64(imageBase64)
                setProfileImgLoading(false)
            }
        })()
    }, [userProfile])

    return (
        <View style={profileHeaderStyles.container}>
            <View
                style={[
                    borderRadius.full,
                    {
                        marginRight: 16,
                    },
                ]}
            >
                {profileImgLoading && <Spinner />}

                {!profileImgLoading && (
                    <Image
                        source={
                            !isFollowed
                                ? profileImgB64
                                    ? { uri: profileImgB64 }
                                    : { uri: tempImage }
                                : userDefaultProfileImg
                        }
                        // source={
                        //   profileImgB64 ? { uri: profileImgB64 } : userDefaultProfileImg
                        // }
                        style={profileHeaderStyles.avater}
                    />
                )}
            </View>

            <View style={{ flex: 1 }}>
                <View>
                    <Text
                        style={[
                            typography.bodyLarge,
                            theme === "light"
                                ? colorsLight.textOnBackground
                                : colorsDark.textOnBackground,
                            { textTransform: "capitalize" },
                        ]}
                    >
                        {userProfile.firstName} {userProfile.lastName}, 24 (M)
                    </Text>
                </View>

                <View>
                    <Text
                        style={[
                            typography.labelMedium,
                            theme === "light"
                                ? colorsLight.textOnBackground
                                : colorsDark.textOnBackground,
                            profileHeaderStyles.jobRoleText,
                        ]}
                    >
                        Screenwriter
                    </Text>
                </View>

                <View>
                    <Text
                        style={[
                            typography.bodyMedium,
                            theme === "light"
                                ? colorsLight.textOnBackground
                                : colorsDark.textOnBackground,
                            { textTransform: "uppercase" },
                        ]}
                    >
                        {isFollowed ? "arts & entertainment" : "pocket fm"}
                    </Text>
                </View>

                <View style={profileHeaderStyles.numbersContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon
                            name="person-add"
                            color={theme === "light" ? "#191c19" : "#e2e3de"}
                        />
                        <Text
                            style={[
                                typography.bodyLarge,
                                theme === "light"
                                    ? colorsLight.textOnBackground
                                    : colorsDark.textOnBackground,
                                { marginLeft: 6 },
                            ]}
                        >
                            745
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Icon
                            name="person"
                            color={theme === "light" ? "#191c19" : "#e2e3de"}
                        />
                        <Text
                            style={[
                                typography.bodyLarge,
                                theme === "light"
                                    ? colorsLight.textOnBackground
                                    : colorsDark.textOnBackground,
                                { marginLeft: 4 },
                            ]}
                        >
                            456
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Icon
                            name="location-pin"
                            color={theme === "light" ? "#191c19" : "#e2e3de"}
                        />
                        <Text
                            style={[
                                typography.bodyLarge,
                                theme === "light"
                                    ? colorsLight.textOnBackground
                                    : colorsDark.textOnBackground,
                                { marginLeft: 3 },
                            ]}
                        >
                            23
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

{
    /* <Button
                    title='Logout'
                    size="sm"
                    type="clear"
                    containerStyle={{ borderRadius: 6 }}
                    titleStyle={{ color: '#707070' }}
                    icon={
                        <Icon
                            name='logout'
                            size={18}
                            type='MaterialIcons'
                            color='#707070'
                            style={{ marginRight: 6 }}
                        />
                    }
                    onPress={() => {
                        logout()
                        navigation.navigate('SignInScreen')
                    }}>Logout</Button> */
}
{
    /* <Button
          title="Edit Profile"
          type="clear"
          size="sm"
          containerStyle={{ borderRadius: 6 }}
          titleStyle={{ color: "#707070" }}
          icon={
            <Icon
              name="edit"
              size={18}
              color={"#707070"}
              style={{ marginRight: 6 }}
            />
          }
          onPress={() => {
            navigation.navigate("EditProfileScreen");
          }}
        /> */
}
