import * as React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import useCachedResources from "./services/hooks/useCachedResources"
import useColorScheme from "./services/hooks/useColorScheme"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { useCallback } from "react"
import { AppRouter } from "./routes/RootRouter"
import { AppProvider } from "./services/context/AppContext"

SplashScreen.preventAutoHideAsync()

export default function App() {

    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()

    const [fontsLoaded] = useFonts({
        Poppins: require("./assets/fonts/Poppins-Black.ttf"),
        SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    if (!isLoadingComplete) {
        return null
    }

    return (
        <SafeAreaProvider onLayout={onLayoutRootView}>
            <AppProvider>
                <AppRouter colorScheme={colorScheme} />
            </AppProvider>
            <StatusBar style="dark" />
        </SafeAreaProvider>
    )
}
