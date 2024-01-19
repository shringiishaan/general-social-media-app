import * as React from "react"
import { Text } from "react-native"

export const AppText = (props: any) => {
	return (
		<Text
			{...props}
			style={[{ fontFamily: "Poppins" }, props.style]}
		/>
	)
}
