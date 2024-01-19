import { Platform, StyleSheet, TouchableOpacity, View, Text } from "react-native"

export const profileHeaderStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	avater: {
		height: 100,
		width: 100,
		borderRadius: 100,
	},
	jobRoleText: {
		textTransform: "capitalize",
		opacity: 0.65,
		paddingTop: 5,
		paddingBottom: 5,
	},
	numbersContainer: {
		// flex: 1,
		// width: "100%",
		maxWidth: 250,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 5,
		padding: 5,
	},
})
