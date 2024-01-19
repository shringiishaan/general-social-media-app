import { View, Text } from "react-native"
import React from "react"
import { editInterestTitleContentStyles } from "./EditIntersetsScreenStyles"

type EditInterestTitleContentProps = {
    tempUserInterests;
};
export function EditInterestTitleContent({
    tempUserInterests,
}: EditInterestTitleContentProps) {
    return (
        <View>
            <Text style={editInterestTitleContentStyles.interestTitle}>Interest</Text>
            <Text style={editInterestTitleContentStyles.interestSubTitle}>
                {tempUserInterests.length}/5+
            </Text>
            <Text style={editInterestTitleContentStyles.interestBodyContent}>
                Add at least 5 interest to your porfile. You'll be able to discuss,
                engage, and meet like-minded souls in these communities.
            </Text>
        </View>
    )
}
