import { StyleSheet } from "react-native"

export const socialsStyles = StyleSheet.create({
	socialsContainer: {
		flex: 1,
		marginBottom: 16,
		marginHorizontal: 8,
	},
	Icons: {
		width: 120,
		height: 50,
		alignSelf: "center",
	},
	youtubeContainer: {
		marginVertical: 8,
	},
	emailText: {
		textAlign: "center",
		flexGrow: 1,
		textAlignVertical: "center",
		height: "100%",
	},
	instagramIconContainer: {
		flexGrow: 1,
		height: 108,
		marginLeft: 8,
		justifyContent: "center",
	},
	instagramIcon: {
		width: 120,
		height: 100,
		alignSelf: "center",
	},
	emailAndPlusContainer: {
		height: 60,
		flex: 1,
		flexDirection: "row-reverse",
	},
	plusIconContainer: {
		flexGrow: 1,
		marginRight: 8,
	},
	plusIcon: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
})
