import * as React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MapViewScreen } from "../screens/map-view/MapViewPage"
import { ProfileDetailsScreen } from "../screens/user-profile/user-profile-details/ProfileDetailsScreen"
import { ChatsListScreen } from "../screens/chats/chats-list-view/ChatsListScreen"
import Icon from "react-native-vector-icons/FontAwesome"
import { ProfileHomeScreen } from "../screens/user-profile/user-profile-main/ProfileHomeScreen"
import { PinsViewPage } from "../screens/map-view/PinsViewPage"
import { PopFeedPage } from "../screens/pop-feed/PopFeedPage"
import * as F5Icon from "react-native-vector-icons/FontAwesome5"
import * as FIcon from "react-native-vector-icons/FontAwesome"
import { UsersListScreen } from "../screens/users-list/UsersListScreen"

const MainTabs = createBottomTabNavigator()

export const BottomTabsRouter = () => {
	return (
		<MainTabs.Navigator
			initialRouteName="PopFeedPage"
			screenOptions={{
				tabBarActiveTintColor: "#333",
				tabBarInactiveTintColor: "#777",
				tabBarActiveBackgroundColor: "#eee",
				tabBarInactiveBackgroundColor: "#eee",
				tabBarStyle: {
					height: 54,
				},
				tabBarIconStyle: {
					marginBottom: 0,
					paddingBottom: 0,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					marginTop: -2,
					paddingTop: 0,
					marginBottom: 6,
				},
				tabBarShowLabel: false,
			}}
		>
			<MainTabs.Screen
				name="MapViewScreen"
				component={PinsViewPage}
				options={({ navigation }) => ({
					title: "Live Avatars",
					tabBarIcon: ({ color }) => (
                        <F5Icon.default name="map-marked-alt" size={20} color={color} />
					),
					headerShown: false,
				})}
			/>
			<MainTabs.Screen
				name="PopFeedPage"
				component={PopFeedPage}
				options={{
					title: "Pop Feed",
					tabBarIcon: ({ color }) => (
                        <FIcon.default name="feed" size={20} color={color} />
					),
					headerShown: false,
				}}
			/>
			<MainTabs.Screen
				name="TabThree"
				component={ChatsListScreen}
				options={{
					title: "Chats",
					tabBarIcon: ({ color }) => (
						<Icon name="comments" color={color} size={25} />
					),
					headerShown: false,
				}}
			/>
			<MainTabs.Screen
				name="ProfileHomeScreen"
				component={ProfileHomeScreen}
				options={({ navigation }) => ({
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<Icon name="user" color={color} size={23} />
					),
					headerShown: false,
				})}
			/>
            <MainTabs.Screen
                name="UsersListScreen"
                component={UsersListScreen}
                options={({ navigation }) => ({
                    title: "Live Avatars",
                    tabBarIcon: ({ color }) => (
                        <F5Icon.default name="users" size={20} color={color} />
                    ),
                    headerShown: false,
                })}
            />
		</MainTabs.Navigator>
	)
}
