import * as React from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { useEffect, useState } from "react"
import * as SecureStore from "expo-secure-store"
import { APIService } from "../services/api.service"
import { Spinner } from "./common/Spinner"
import { colorsLight } from "../styles/Colors"
import { EUserGender } from "../services/interfaces"
import { useAppContext } from "../services/context/AppContext"

export function AppInitPage({ navigation }: any) {

    const { appState: { user }, setAuth } = useAppContext()

    useEffect(() => {
        if (user) {
            if (user.avatarImageId === 1) {
                navigation.navigate("AvatarGeneratorScreen")
            } else {
                navigation.navigate("BottomTabsRouter")
            }
        }
    }, [user])

    useEffect(() => {
        (async () => {
            const AuthToken: string | null = await SecureStore.getItemAsync("AUTH_TOKEN")
            if (AuthToken !== null) {
                console.log("AppInit : Loading Auth Token")
                APIService.AuthToken = AuthToken
                console.log("TOKRN::", AuthToken)
                APIService.getUser().then(({ user }) => {
                    console.log(`AppInit : Auto Sign In Success [${user.id}. ${user.firstName} ${user.lastName}]`)
                    console.log(`Auth Token : ${AuthToken}`)
                    setAuth(user, AuthToken!)
                }).catch((err) => {
                    SecureStore.deleteItemAsync("AUTH_TOKEN").then(() => { }).catch(() => { })
                    navigation.navigate("SignInPage")
                })
            } else {
                console.log("AppInit : No Auth Token")
                navigation.navigate("SignInPage")
            }
        })()
    }, [])

    return (
        <View
            style={ [
                colorsLight.Background,
                {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                },
            ] }
        >
            <Spinner size={ 16 } color="#707070" />
        </View>
    )
}
