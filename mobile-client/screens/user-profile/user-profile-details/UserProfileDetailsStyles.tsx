import { colorsLight } from "../../../styles/Colors"
import { typography } from "../../../styles/Typography"
import { borderRadius } from "../../../styles/Radius"
import CommonCardStyles from "../../../styles/CommonCardStyles"
import { Spacing } from "../../../styles/Spacing"
import { StyleSheet } from "react-native"

export const bioStyles = StyleSheet.create({
	container: { 
        paddingHorizontal: 10, 
        paddingVertical: 5 
    },
	bioHeading: {
		...typography.titleMedium,
		color: colorsLight.textOnBackground.color,
	},
	bioUrlText: {
		...typography.bodyMedium,
		color: "#2c59ba",
	},
	actionButtonsContainer: {
		flex: 1,
		marginTop: 3,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
})

export const careerStyles = StyleSheet.create({
	container: {
		...CommonCardStyles.container,
		...colorsLight.backgroundSecondaryContainer,
		marginTop: 0,
	},
	carrerTitle: {
		...CommonCardStyles.cardTitle,
		...colorsLight.textOnSecondaryContainer,
	},
	careerText: {
		...colorsLight.textOnSecondaryContainer,
		...CommonCardStyles.cardText,
	},
})

export const educationStyles = StyleSheet.create({
	container: {
		...CommonCardStyles.container,
		...colorsLight.backgroundTertiaryContainer,
	},
	educationTitle: {
		...CommonCardStyles.cardTitle,
		...colorsLight.textOnTertiaryContainer,
	},
	educationText: {
		...colorsLight.textOnTertiaryContainer,
		...CommonCardStyles.cardText,
	},
})

export const collabCardStyles = StyleSheet.create({
	container: {
		marginHorizontal: 3,
		marginVertical: 10,
		overflow: "hidden",
		...borderRadius.xl,
		backgroundColor: "#0a6d3625",
	},
	pressableContainer: {
		...borderRadius.xl,
		...Spacing.p4,
	},
	heading: {
		...typography.titleMedium,
		...colorsLight.textOnSurface,
		maxWidth: 350,
	},
	subheading: {
		...colorsLight.textOnSurface,
		...CommonCardStyles.cardText,
		marginTop: 3,
		marginBottom: 3,
		opacity: 0.8,
	},
	bodyContent: {
		...colorsLight.textOnSurface,
		...CommonCardStyles.cardText,
	},
})
