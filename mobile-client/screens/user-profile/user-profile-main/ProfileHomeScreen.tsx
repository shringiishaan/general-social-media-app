import * as React from "react"
import { View, Text, Image, ScrollView } from "react-native"
import { Button, Icon } from "@rneui/base"
import { typography } from "../../../styles/Typography"
import { bioStyles } from "../user-profile-details/UserProfileDetailsStyles"
import { colorsDark, colorsLight } from "../../../styles/Colors"
import { borderRadius } from "../../../styles/Radius"
import UserCareerCard from "../user-profile-details/UserCareerCard"
import { SafeAreaView } from "react-native"
import { Spacing } from "../../../styles/Spacing"
import { NavigationProp } from "@react-navigation/native"
import { IUser } from "../../../services/interfaces"
import { useAppContext } from "../../../services/context/AppContext"

type ProfileScreenProps = {
    navigation: NavigationProp<any>
}

export const ProfileHomeScreen = ({
    navigation,
}: ProfileScreenProps): JSX.Element => {
    const { appState: { user } } = useAppContext()
    if (!user) return <></>
    const [theme, setTheme] = React.useState<string>("light")
    const tempImage: string =
        "https://images.unsplash.com/photo-1567694673713-c7bb11f143a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80"

    return (
        <SafeAreaView
            style={ [
                theme === "light" ? colorsLight.Background : colorsDark.Background,
                { flex: 1 },
            ] }
        >

            <ScrollView
                style={ {
                    display: "flex",
                    flexDirection: "column",
                } }
                contentContainerStyle={ {
                    paddingTop: 50,
                    paddingBottom: 100,
                    padding: 8,
                } }
            >
                <View
                    style={ [bioStyles.actionButtonsContainer, { paddingHorizontal: 8 }] }
                >
                    <Button
                        buttonStyle={ colorsLight.backgroundTertiaryContainer }
                        //   containerStyle={{ flex: 1 }}
                        titleStyle={ [
                            colorsLight.textOnTertiaryContainer,
                            typography.labelLarge,
                        ] }
                        onPress={ () => {
                            navigation.navigate("EditProfileScreen")
                        } }
                        radius={ "xl" }
                    >
                        Edit Profile
                    </Button>
                    <Button
                        buttonStyle={ colorsLight.SurfaceContainerLow }
                        //   containerStyle={{ marginLeft: 8 }}
                        titleStyle={ [colorsLight.textOnSurface, typography.labelLarge] }
                        radius={ "xl" }
                    >
                        <Icon name="settings" type="material" />
                    </Button>
                </View>

                {/* Profile Avater  */ }
                <View
                    style={ {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 16,
                    } }
                >
                    <View style={ { position: "relative", marginBottom: 12 } }>
                        <Image
                            source={ { uri: tempImage } }
                            style={ { width: 130, height: 130, borderRadius: 100 } }
                        />
                        <View
                            style={ [
                                colorsLight.backgroundTertiaryContainer,
                                borderRadius.full,
                                {
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    transform: [{ scale: 1.07 }],
                                    zIndex: -5,
                                    elevation: 1,
                                },
                            ] }
                        />
                    </View>

                    <Text
                        style={ {
                            fontSize: 20,
                            marginBottom: 10,
                        } }
                    >
                        { user.firstName } { user.lastName } (24) { user.gender }
                    </Text>

                    <Button
                        buttonStyle={ [colorsLight.backgroundTertiaryContainer] }
                        titleStyle={ [
                            colorsLight.textOnTertiaryContainer,
                            typography.labelLarge,
                        ] }
                        radius={ "xl" }
                        onPress={ () => {
                            navigation.navigate("ProfileDetailsScreen")
                        } }
                    >
                        View Profile
                    </Button>
                </View>

                {/* Pay Plan Container  */ }
                <View style={ { padding: 8 } }>
                    {/* Pay Plan Heading Text  */ }
                    <Text
                        style={ [
                            colorsLight.textOnBackground,
                            typography.bodyLarge,
                            typography.textUppercase,
                        ] }
                    >
                        my pay plan
                    </Text>
                    {/* Pay Plan Sub Container  */ }
                    <View
                        style={ {
                            flex: 1,
                            marginVertical: 8,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        } }
                    >
                        <View
                            style={ [
                                colorsLight.SurfaceContainer,
                                borderRadius.xl,
                                { padding: 16, flexGrow: 0.1 },
                            ] }
                        >
                            <Icon name="settings" type="material" />
                            <Text
                                style={ [
                                    typography.textUppercase,
                                    typography.bodyMedium,
                                    colorsLight.textOnSurface,
                                    { marginVertical: 4, textAlign: "center" },
                                ] }
                            >
                                spotlight
                            </Text>
                            <Text
                                style={ [
                                    typography.textUppercase,
                                    typography.bodyMedium,
                                    colorsLight.textOnSurface,
                                    { textAlign: "center" },
                                ] }
                            >
                                50 inr
                            </Text>
                        </View>

                        <View
                            style={ [
                                colorsLight.SurfaceContainer,
                                borderRadius.xl,
                                { marginHorizontal: 6, padding: 16, flexGrow: 1 },
                            ] }
                        >
                            <Icon name="settings" type="material" />
                            <Text
                                style={ [
                                    typography.textUppercase,
                                    typography.bodyMedium,
                                    colorsLight.textOnSurface,
                                    { marginVertical: 4, textAlign: "center" },
                                ] }
                            >
                                taps
                            </Text>
                            <Text
                                style={ [
                                    typography.textUppercase,
                                    typography.bodyMedium,
                                    colorsLight.textOnSurface,
                                    { textAlign: "center" },
                                ] }
                            >
                                6 inr
                            </Text>
                        </View>

                        <View
                            style={ [
                                colorsLight.SurfaceContainer,
                                borderRadius.xl,
                                { padding: 16, flexGrow: 1 },
                            ] }
                        >
                            <Icon name="settings" type="material" />
                            <Text
                                style={ [
                                    typography.textUppercase,
                                    typography.bodyMedium,
                                    colorsLight.textOnSurface,
                                    { marginVertical: 4, textAlign: "center" },
                                ] }
                            >
                                pins
                            </Text>
                            <Text
                                style={ [
                                    typography.textUppercase,
                                    typography.bodyMedium,
                                    colorsLight.textOnSurface,
                                    { textAlign: "center" },
                                ] }
                            >
                                99 inr
                            </Text>
                        </View>
                    </View>
                </View>
                <UserCareerCard />
                <Text
                    style={ [
                        colorsLight.textOnBackground,
                        typography.bodyLarge,
                        {
                            paddingHorizontal: 8,
                            textTransform: "capitalize",
                            paddingBottom: 8,
                        },
                    ] }
                >
                    safety & welling
                </Text>
                <UserCareerCard />
                <Text
                    style={ [
                        colorsLight.textOnBackground,
                        typography.bodyLarge,
                        {
                            paddingHorizontal: 8,
                            textTransform: "capitalize",
                            paddingBottom: 8,
                        },
                    ] }
                >
                    get help from tap
                </Text>
                <UserCareerCard />
            </ScrollView>
        </SafeAreaView>
    )
}
