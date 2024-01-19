import { StyleSheet } from "react-native"
import { Spacing } from "../Spacing"

export const AboutStyles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 12,
		paddingVertical: 16,
		marginHorizontal: 6,
	},
	headingTextMargin: {
		marginBottom: 12,
		paddingHorizontal: 4,
	},
	subHeadingPadding: {
		paddingHorizontal: Spacing.px1.paddingHorizontal
	},
	pillsContainer: {
		flexWrap: "wrap",
		flexDirection: "row",
		flex: 1,
		paddingTop: 4,
	},
	pills: {
		textTransform: "uppercase",
		paddingVertical: 4,
		paddingHorizontal: 12,
		borderRadius: 100,
		margin: 4,
		alignSelf: "center",
	},
})
