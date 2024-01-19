import * as React from "react"
import { Dispatch, useEffect } from "react"
// import { ColorSchemeName } from "react-native";
import useColorScheme from "../../services/hooks/useColorScheme"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { lightColors } from "@rneui/base"
import { Button } from "@rneui/themed"
import { View } from "react-native"

type ThemeToggleProps = {
  theme: string;
  setTheme: Dispatch<React.SetStateAction<string>>;
};

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
	//   const [theme, setTheme] = useState("light");
	const colorScheme = useColorScheme()

	// Function to toggle the theme
	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light"
		setTheme(newTheme)
	}

	// Save the theme preference to AsyncStorage
	useEffect(() => {
		AsyncStorage.setItem("theme", theme)
	}, [theme])

	// Load the saved theme preference on app startup
	useEffect(() => {
		AsyncStorage.getItem("theme").then((storedTheme) => {
			if (storedTheme) {
				setTheme(storedTheme)
			}
		})
	}, [])

	return (
		<View>
			<Button
				title={
					theme === "dark" ? "Switch To Light Theme" : "Switch To Dark Theme"
				}
				buttonStyle={{
					borderRadius: 20
				}}
				onPress={toggleTheme}
			/>
		</View>
	)
}
