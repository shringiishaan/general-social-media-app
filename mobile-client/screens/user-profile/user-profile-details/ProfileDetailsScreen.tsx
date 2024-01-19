import * as React from "react"
import { ScrollView, View } from "react-native"
import { useState, useEffect } from "react"
import {
    EUserGender,
    IUser,
    IUserInterest,
    IUserInterestCategory,
} from "../../../services/interfaces"
import { SafeAreaView } from "react-native-safe-area-context"
import { UserInfoSection } from "./UserInfoSection"
import { Spinner } from "../../common/Spinner"
import { APIService } from "../../../services/api.service"
import { NavigationProp } from "@react-navigation/native"
import { useAppContext } from "../../../services/context/AppContext"
import { UserBio } from "./UserBio"
import { UserInterestSection } from "../user-interests/UserInterestSection"
import { colorsDark, colorsLight } from "../../../styles/Colors"
import { UserCollabCard } from "./UserCollabCard"
import { UserAboutCard } from "./UserAboutCard"
import { UserSocials } from "./UserSocials"
import { ThemeToggle } from "../../common/ThemeToggle"
import { UserEducationCard } from "./UserEducationCard"
import UserCareerCard from "./UserCareerCard"
import { Spacing } from "../../../styles/Spacing"
import { Text } from "react-native"
import { Icon } from "@rneui/base"

type ProfileScreenProps = {
    navigation: NavigationProp<any>;
    route: any;
};

export const ProfileDetailsScreen = ({ navigation, route }: ProfileScreenProps) => {

    console.log("Profile Details Screen : ", route.params)
    const { appState: { user } } = useAppContext()
    if (!user) {
        return <></>
    }

    const userId: number = route.params?.user.id || user.id
    const isMyProfile: boolean = Boolean(userId) && Boolean(userId === user.id)
    const [theme, setTheme] = useState<string>("light")
    const [userProfile, setUserProfile] = useState<IUser>()
    const [loading, setLoading] = useState<boolean>(true)
    const [isFollowed, setIsFollowed] = useState(true)

    useEffect(() => {
        setLoading(true)
        console.log("loading user : ", userId)
        APIService.getUserByUserId(userId).then((user: IUser) => {
            console.log("got user : ", user)
            setUserProfile(user)
            setLoading(false)
        }).catch((error: string) => {
            console.error(error)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <SafeAreaView style={[colorsLight.Background, { flex: 1 }]}>
                <Spinner
                    size={24}
                    color="#191c19"
                    containerStyle={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        paddingVertical: 50,
                        backgroundColor: "#fcfdf7",
                    }}
                />
            </SafeAreaView>
        )
    }

    return (
        <View
            style={[
                theme === "light" ? colorsLight.Background : colorsDark.Background,
                { padding: 0, display: "flex", flex: 1 },
            ]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 8,
                    paddingTop: 30,
                    paddingBottom: 100,
                }}
                style={{ margin: 0 }}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                    }}>
                    <Icon
                        name="arrow-left"
                        size={36}
                        color={theme === "light" ? "#333" : "#c5c7c2"}
                        onPress={() => {
                            navigation.goBack()
                        }} />
                    <Text
                        style={{
                            fontSize: 20,
                            marginLeft: 10,
                            color: "#333",
                        }}>
                        {isMyProfile ? "My Profile" : "Profile"}
                    </Text>
                </View>
                {userProfile && (
                    <UserInfoSection
                        userProfile={userProfile}
                        navigation={navigation}
                        isFollowed={isFollowed}
                        theme={theme} />
                )}
                {userProfile && (
                    <UserBio
                        userProfile={userProfile}
                        navigation={navigation}
                        isFollowed={isFollowed}
                        setIsFollowed={setIsFollowed} />
                )}
                <UserInterestSection theme={theme} />
                <UserCollabCard />
                {!isFollowed && <UserSocials theme={theme} />}
                <UserAboutCard theme={theme} />
                <UserEducationCard theme={theme} />
                <UserCareerCard />
                <ThemeToggle theme={theme} setTheme={setTheme} />
            </ScrollView>
        </View>
    )
}

enum PageActionType { }
interface PageAction {
    type: PageActionType;
    payload: any;
}
interface PageState {
    interests: IUserInterest[];
}
function capturePaymentReducer(
    state: PageState,
    action: PageAction
): PageState {
    const { type, payload } = action
    switch (type) {
        default: {
            return state
        }
    }
}

const userInterests: any[] = [
    {
        id: 1,
        name: "Football",
        categoryId: 4,
    },
    {
        id: 2,
        name: "Cricket",
        categoryId: 4,
    },
    {
        id: 3,
        name: "Basketball",
        categoryId: 4,
    },
    {
        id: 4,
        name: "Swimming",
        categoryId: 4,
    },
    {
        id: 5,
        name: "Badminton",
        categoryId: 4,
    },
    {
        id: 6,
        name: "Cycling",
        categoryId: 4,
    },
    {
        id: 7,
        name: "Books",
        categoryId: 1,
    },
    {
        id: 8,
        name: "Movies",
        categoryId: 1,
    },
    {
        id: 9,
        name: "Music",
        categoryId: 1,
    },
    {
        id: 10,
        name: "Dance",
        categoryId: 1,
    },
    {
        id: 11,
        name: "Painting",
        categoryId: 1,
    },
    {
        id: 12,
        name: "Photography",
        categoryId: 1,
    },
    {
        id: 13,
        name: "Cooking",
        categoryId: 1,
    },
]
