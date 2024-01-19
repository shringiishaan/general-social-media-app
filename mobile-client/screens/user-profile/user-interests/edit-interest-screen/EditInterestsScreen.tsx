import * as React from "react"
import { NavigationProp } from "@react-navigation/native"
import { ScrollView, StatusBar, Text, View } from "react-native"
import { APIService } from "../../../../services/api.service"
import { useAppContext } from "../../../../services/context/AppContext"
import { colorsLight } from "../../../../styles/Colors"
import { SafeAreaView } from "react-native-safe-area-context"
import { typography } from "../../../../styles/Typography"
import { borderRadius } from "../../../../styles/Radius"
import { Spacing } from "../../../../styles/Spacing"
import { interestedInStyles } from "../../../../styles/profile-styles/interestedInCard"
import { EditInterestSearchBar } from "./EditInterestSearchBar"
import { EditInterestTitleContent } from "./EditInterestTitleContent"
import { EditInterestTabsSection } from "./EditInterestTabsSection"
import { IUserInterest, IUserInterestsCollection } from "../../../../services/interfaces"
import { Spinner } from "../../../common/Spinner"
import { Button, Icon } from "@rneui/themed"

type EditInterestsScreenProps = {
    navigation: NavigationProp<any>;
};

export const EditInterestsScreen = ({ navigation }: EditInterestsScreenProps) => {

    const [error, setError] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)
    const { appState: { user, interests: userInterests }, setUserInterests } = useAppContext();

    const loadUserInterests = () => {
        setLoading(true)
        console.log("loading edit user interests screen interests")
        APIService.getMyUserInterests()
            .then((userInterest: IUserInterestsCollection[]) => {
                setUserInterests(userInterest)
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }



    const updateAllInterests = () => { }

    React.useEffect(() => {
        loadUserInterests()
    }, [])

    const DrawContent = () => {
        if (error) {
            return (
                <Text>{error}</Text>
            )
        }
        if (loading) {
            return (
                <Spinner />
            )
        }
        if (!userInterests) {
            return <></>
        }
        if (userInterests.length === 0) {
            return (
                <Text>No interests found</Text>
            )
        }
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Spacing.py1Half}
            >
                <View style={interestedInStyles.pillsContainer}>
                    {userInterests.map((collection: IUserInterestsCollection) => (
                        <View key={collection.category.id}>
                            {collection.interests.map((interest) => (
                                <Text
                                    key={interest.id}
                                    style={[
                                        colorsLight.backgroundOnTertiaryContainer,
                                        colorsLight.textTertiaryContainer,
                                        interestedInStyles.pills,
                                        typography.labelMedium,
                                        borderRadius.full,
                                    ]}
                                >
                                    {interest.name}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>

            </ScrollView>
        )
    }

    return (
        <SafeAreaView
            style={[
                colorsLight.Background,
                {
                    flex: 1,
                    alignItems: "stretch",
                    justifyContent: "flex-start",
                    paddingTop: StatusBar.currentHeight,
                },
            ]}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingHorizontal: 5,
                    marginTop: 10,
                    marginBottom: 20,
                }}>
                <Button
                    type='clear'
                    onPress={() => {
                        navigation.goBack()
                    }}
                    icon={
                        <Icon
                            name="arrow-back"
                            color={"#707070"} />
                    }
                />
                <Text
                    style={{
                        marginLeft: 6,
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#707070",
                    }}>
                    Edit My Interests
                </Text>
            </View>
            <View style={[colorsLight.Background, { padding: 16 }]}>
                <EditInterestSearchBar />
                <EditInterestTitleContent tempUserInterests={userInterests} />

                {/* Selected Interest by users  */}
                <View
                    style={[
                        colorsLight.backgroundTertiaryContainer,
                        borderRadius.xl,
                        { maxHeight: 220, padding: 4, paddingVertical: 8 },
                    ]}
                >
                    {DrawContent()}
                </View>

                <EditInterestTabsSection userInterestsUpdated={setUserInterests} />
            </View>
        </SafeAreaView>
    )
}
