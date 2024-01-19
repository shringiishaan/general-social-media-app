import * as React from "react"
import { NavigationProp } from "@react-navigation/native"
import { Text, View } from "react-native"

type EditInterestsScreenProps = {
    navigation: NavigationProp<any>
}

export const EditInterestsScreen = ({ navigation }: EditInterestsScreenProps) => {

    

	return (
		<View>
			<Text>Edit Interests</Text>
		</View>
	)
}