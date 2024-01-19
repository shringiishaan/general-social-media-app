import * as React from "react"
import { Button, Icon } from "@rneui/themed"

type ButtonProps = {
    onPress: () => void,
    loading?: boolean,
    disabled?: boolean
}

export function BigNextButton({ onPress, loading, disabled }: ButtonProps) {
	return (
		<Button
			loading={loading}
			disabled={disabled}
			title="NEXT"
			type='solid'
			icon={
				<Icon
					name="arrow-right"
					size={32}
					color="white" />}
			iconPosition='right'
			titleStyle={{
				color: "white",
				fontSize: 22
			}}
			buttonStyle={{
				borderRadius: 100,
			}}
			onPress={() => onPress()}
		/>
	)
}
