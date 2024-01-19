import * as React from "react"
import { View, Text } from "react-native"
import { careerStyles } from "./UserProfileDetailsStyles"

type UserCareerCardProps = {};

export default function UserCareerCard({}: UserCareerCardProps) {
	const myEducations: string[] = [
		"Frontend Developer@NoteSync",
		"UI Designer@Vercel",
		"Design Engineer@Keyboard",
	]
	return (
		<View style={careerStyles.container}>
			<Text style={careerStyles.carrerTitle}>Career</Text>

			{myEducations.map((education, index) => {
				return (
					<Text key={index} style={careerStyles.careerText}>
						{education}.
					</Text>
				)
			})}
		</View>
	)
}
