import * as React from "react"
import { Icon } from "@rneui/base"
import { View, ActivityIndicator, ViewStyle } from "react-native"

type SpinnerProps = {
    size?: number,
    color?: string,
    backgroundColor?: string
    containerStyle?: ViewStyle
}

export function Spinner({ size, color, backgroundColor, containerStyle }: SpinnerProps) {
	return (
		<View
			style={[{
				flex: 1,
				backgroundColor: backgroundColor ? backgroundColor : "transparent",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}, containerStyle]}>

			<ActivityIndicator
				size={size ? size : 14}
				color={color ? color : "#707070"}
			/>

		</View>
	)
}
