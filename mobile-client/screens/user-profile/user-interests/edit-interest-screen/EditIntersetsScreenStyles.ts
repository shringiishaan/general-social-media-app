import { colorsLight } from "../../../../styles/Colors"
import { typography } from "../../../../styles/Typography"
import { borderRadius } from "../../../../styles/Radius"
import { interestedInStyles } from "../../../../styles/profile-styles/interestedInCard"
import { StyleSheet } from "react-native"

export const editInterestSearchBarStyles = StyleSheet.create({

	searchBarContainer: { position: "relative", paddingVertical: 8 },

	searchInput: {
		backgroundColor: colorsLight.SurfaceContainer.backgroundColor,
		...typography.titleMedium,
		...borderRadius.full,
		paddingHorizontal: 8,
		paddingLeft: 45,
		paddingVertical: 4,
	},

	searchIcon: { position: "absolute", top: 17, left: 13 },
})

export const editInterestTabsSectionStyles = StyleSheet.create({
	tabsContainer: {
		backgroundColor: colorsLight.SurfaceContainerHigh.backgroundColor,
		...borderRadius.lg,
		flexDirection: "row",
		padding: 8,
		marginVertical: 20,
        height: 200
	},
	categoryButton: {
		backgroundColor: colorsLight.SurfaceContainerLow.backgroundColor,
	},
	filteredInterestContainer: {
		...borderRadius.xl,
		flex: 2,
		padding: 4,
		paddingVertical: 8,
	},
	filteredPills: {
		backgroundColor: colorsLight.backgroundOnTertiaryContainer.backgroundColor,
		color: colorsLight.textTertiaryContainer.color,
		...interestedInStyles.pills,
		...typography.labelMedium,
		...borderRadius.full,
	},
})

export const editInterestTitleContentStyles = StyleSheet.create({
	interestTitle: {
		...typography.titleLarge,
		color: colorsLight.textOnBackground.color,
	},
	interestSubTitle: {
		color: colorsLight.textPrimary.color,
		...typography.titleSmall,
	},
	interestBodyContent: {
		color: colorsLight.textOnBackground.color,
		...typography.bodySmall,
	},
})
