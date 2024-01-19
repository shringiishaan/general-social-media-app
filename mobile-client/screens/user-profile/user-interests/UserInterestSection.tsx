import * as React from "react"
import { ScrollView, Text, View } from "react-native"
import { IUserInterest, IUserInterestsCollection } from "../../../services/interfaces"
import mockInterestsData from "../../../services/api.service"
import { APIService } from "../../../services/api.service"
import { colorsLight } from "../../../styles/Colors"
import { typography } from "../../../styles/Typography"
import { borderRadius } from "../../../styles/Radius"
import { interestedInStyles } from "../../../styles/profile-styles/interestedInCard"
import { Spacing } from "../../../styles/Spacing"
import { useAppContext } from "../../../services/context/AppContext"

type UserInterestSectionProps = {
    theme: string;
};

export function UserInterestSection({ theme }: UserInterestSectionProps) {

    const [loading, setLoading] = React.useState(false)
    const { appState: { user, interests: userInterests }, setUserInterests } = useAppContext();
    const [error, setError] = React.useState<string | null>(null)

    const loadUserInterests = () => {
        setLoading(true)
        console.log("loading user interests section")
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

    React.useEffect(() => {
        loadUserInterests()
    }, [])

    return (
        <View
            style={[
                borderRadius.xl,
                interestedInStyles.container,
                {
                    backgroundColor: theme === "light" ? "#ffd8ed" : "#86006f",
                },
            ]}
        >
            <View style={Spacing.px1}>
                <Text
                    style={[
                        typography.titleMedium,
                        typography.textUppercase,
                        colorsLight.textOnTertiaryContainer,
                        {
                            color: theme === "light" ? "#3b002f" : "#ffd8ed",
                        },
                    ]}
                >
                    Interested in
                </Text>
            </View>

            <View style={{ maxHeight: 220 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={Spacing.py1Half}
                >
                    <View style={interestedInStyles.pillsContainer}>
                        {userInterests && userInterests.length > 0 ? (
                            userInterests.map((category) => {
                                return category.interests.map((interest) => (
                                    <Text
                                        key={interest.id}
                                        style={[
                                            colorsLight.backgroundOnTertiaryContainer,
                                            colorsLight.textTertiaryContainer,
                                            interestedInStyles.pills,
                                            typography.labelLarge,
                                            borderRadius.full,
                                            {
                                                backgroundColor: theme === "light" ? "#3b002f" : "#ffd8ed",
                                                color: theme === "light" ? "#ffd8ed" : "#86006f",
                                            },
                                        ]}
                                    >
                                        #{interest.name}
                                    </Text>
                                ))
                            })
                        ) : (null &&
                            <Text>No interest added</Text>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
