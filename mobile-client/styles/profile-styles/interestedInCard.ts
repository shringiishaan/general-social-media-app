import { StyleSheet } from "react-native"

export const interestedInStyles = StyleSheet.create({
	container: {
		marginHorizontal: 6,
		marginTop: 16,
		paddingVertical: 16,
		paddingHorizontal: 12,
	},
	pillsContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	pills: {
		paddingHorizontal: 16,
		margin: 4,
		height: 32,
		textAlign: "center",
		textAlignVertical: "center",
		textTransform: "lowercase",
	},
})
