import * as React from "react"
import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { Button, Icon, Input } from "@rneui/themed"
import { useEffect, useState, useRef } from "react"
import { BigNextButton } from "../common/BigNextButton"
import { validateName, validatePhoneNumber } from "../../services/validations"
import { APIService } from "../../services/api.service"
import { useAppContext } from "../../services/context/AppContext"

export function AvatarGeneratorScreen({ navigation }: any): JSX.Element {

    const { appState: { user }, setAuth } = useAppContext();

    return (
        <View style={styles.container}>
            <View style={{ display: "flex", alignItems: "center", backgroundColor: "transparent" }}>
                <Text style={{ ...styles.title, marginBottom: 40, color: "#666" }}>
                    Hi {user?.firstName}! This screen will be used to generate your Avatar.
                </Text>
                <Button
                    buttonStyle={{ borderRadius: 100, paddingVertical: 12, paddingHorizontal: 30 }}
                    containerStyle={{ borderRadius: 100 }}
                    icon={<Icon name="home" style={{ marginRight: 10 }} size={24} color="white" />}
                    title="Go to Home Page"
                    raised
                    type='solid'
                    titleStyle={{ color: "white", fontSize: 20 }}
                    onPress={() => navigation.navigate("BottomTabsRouter")}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        backgroundColor: "#eee",
        paddingHorizontal: 20,
        paddingVertical: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Poppins"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
})