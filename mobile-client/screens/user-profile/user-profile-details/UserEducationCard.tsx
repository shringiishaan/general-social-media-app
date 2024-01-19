import * as React from "react"
import { View, Text } from "react-native"
import { educationStyles } from "./UserProfileDetailsStyles"

type UserEducationProps = {
  theme: string;
};

export function UserEducationCard({ theme }: UserEducationProps) {
	const myEducations: string[] = [
		"Bachelors of Science@St.GTA",
		"Master of Photoshop@St.Youtube",
		"Keyboard of Warrior@Twitter",
	]
	return (
		<View style={educationStyles.container}>
			<Text style={educationStyles.educationTitle}>Education</Text>
			{myEducations.map((education, index) => {
				return (
					<Text key={index} style={educationStyles.educationText}>
						{education}.
					</Text>
				)
			})}
		</View>
	)
}
