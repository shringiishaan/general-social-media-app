import * as React from "react"
import { FontAwesome } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ColorSchemeName, Pressable } from "react-native"
import { SignInPage } from "../screens/new-user/SignInPage"
import { SignUpPage } from "../screens/new-user/SignUpPage"
import Icon from "react-native-vector-icons/FontAwesome"
import { ProfileDetailsScreen } from "../screens/user-profile/user-profile-details/ProfileDetailsScreen"
import { ChatsListScreen } from "../screens/chats/chats-list-view/ChatsListScreen"
import { AppInitPage } from "../screens/AppInitPage"
import { AddPostScreen } from "../screens/AddPostScreen"
import { EditProfileScreen } from "../screens/user-profile/user-profile-edit/EditProfileScreen"
import { MapViewScreen } from "../screens/map-view/MapViewPage"
import { AvatarGeneratorScreen } from "../screens/avatar-generator/AvatarGeneratorScreen"
import { BottomTabsRouter } from "./BottomTabsRouter"
import { lightColors } from "@rneui/base"
import { EditUserInterestTagsScreen } from "../screens/user-profile/user-profile-edit/EditUserInterestTagsScreen"
import { EditInterestsScreen } from "../screens/user-profile/user-interests/edit-interest-screen/EditInterestsScreen"
import { EditUserLanguageScreen } from "../screens/user-profile/user-profile-edit/EditLanguageScreen"
import { EditMyEducationScreenMain } from "../screens/user-profile/user-education/EditMyEducationScreenMain"
import { EditMyCareerScreenMain } from "../screens/user-profile/user-career/EditMyCareerScreenMain"
import { EditMyMapPinsScreen } from "../screens/user-profile/user-profile-edit/EditMyMapPinsScreen"
import { PinUsersListPage } from "../screens/map-view/PinUsersListPage"
import { ChatViewScreen } from "../screens/chats/chat-view/ChatViewScreen"
import { OtpScreen } from "../screens/new-user/OtpScreen"
import { CreateNewPopPage } from "../screens/pop-feed/CreateNewPopPage"

export const AppRouter = ({
    colorScheme,
}: {
    colorScheme: ColorSchemeName;
}) => {
    return (
        <NavigationContainer
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <RootRouter />
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator()

function RootRouter() {
    if (true) {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="AppInitPage"
                    component={AppInitPage}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="SignInPage"
                    component={SignInPage}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="SignUpPage"
                    component={SignUpPage}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="AvatarGeneratorScreen"
                    component={AvatarGeneratorScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BottomTabsRouter"
                    component={BottomTabsRouter}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileDetailsScreen"
                    component={ProfileDetailsScreen}
                    options={{
                        headerShown: false,
                        presentation: "modal",
                        title: "My Profile",
                        headerStyle: {
                            backgroundColor: lightColors.background,
                        },
                        headerTitleStyle: {
                            color: "#333",
                        },
                        headerTintColor: "#333",
                    }}
                />
                <Stack.Screen
                    name="EditProfileScreen"
                    component={EditProfileScreen}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="AddPostScreen"
                    component={AddPostScreen}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="EditUserInterestTagsScreen"
                    component={EditInterestsScreen}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="EditUserLanguageScreen"
                    component={EditUserLanguageScreen}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="EditMyEducationScreenMain"
                    component={EditMyEducationScreenMain}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="EditMyCareerScreen"
                    component={EditMyCareerScreenMain}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="EditMyMapPinsScreen"
                    component={EditMyMapPinsScreen}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="PinUsersListPage"
                    component={PinUsersListPage}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="ChatViewScreen"
                    component={ChatViewScreen}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="OtpScreen"
                    component={OtpScreen}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="CreateNewPopPage"
                    component={CreateNewPopPage}
                    options={{ headerShown: false, presentation: "modal" }}
                />
            </Stack.Navigator>
        )
    }
}
