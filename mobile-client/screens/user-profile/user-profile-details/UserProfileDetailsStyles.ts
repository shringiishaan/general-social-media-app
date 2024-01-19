import { colorsLight } from "../../../styles/Colors"
import { typography } from "../../../styles/Typography"
import { borderRadius } from "../../../styles/Radius"
import CommonCardStyles from "../../../styles/CommonCardStyles"
import { Spacing } from "../../../styles/Spacing"
import { StyleSheet } from "react-native"

export const bioStyles = StyleSheet.create({
	container: { paddingHorizontal: 16, paddingVertical: 8 },
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
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
})

export const careerStyles = StyleSheet.create({
	container: {
		...CommonCardStyles.container,
		...borderRadius.xl,
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
		...borderRadius.xl,
		...Spacing.p4,
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
		marginHorizontal: 6,
		marginVertical: 16,
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

		marginTop: 4,
		marginBottom: 12,
		opacity: 0.8,
	},
	bodyContent: {
		...colorsLight.textOnSurface,
		...CommonCardStyles.cardText,
	},
})

export const profileHeaderStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	avater: {
		height: 100,
		width: 100,
		borderRadius: 100,
	},
	jobRoleText: {
		textTransform: "capitalize",
		opacity: 0.65,
		paddingTop: 3,
		paddingBottom: 2,
	},
	numbersContainer: {
		// flex: 1,
		// width: "100%",
		maxWidth: 250,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 8,
		padding: 4,
	},
})
