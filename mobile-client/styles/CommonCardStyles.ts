import { borderRadius } from "./Radius"
import { Spacing } from "./Spacing"
import { typography } from "./Typography"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
	container: {
		marginHorizontal: 6,
		marginVertical: 16,
		overflow: "hidden",
		borderRadius: borderRadius.xl.borderRadius,
		padding: Spacing.p4.padding,
	},
	cardTitle: {
		...typography.titleMedium,
		...Spacing.pb2,
	},
	cardText: {
		...typography.bodySmall,
	},
})