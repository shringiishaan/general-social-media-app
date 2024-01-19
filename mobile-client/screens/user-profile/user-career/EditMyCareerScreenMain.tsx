import * as React from "react"
import {
    StyleSheet,
    View,
    Text,
} from "react-native"
import { NavigationProp } from "@react-navigation/native"
import { IUserCareer } from "../../../services/interfaces"
import { EditMyCareerScreen } from "./EditMyCareerScreen"
import { AddCareerScreen } from "./AddCareerScreen"
import { EditCareerScreen } from "./EditCareerScreen"
import { useAppContext } from "../../../services/context/AppContext"


type EditMyCareerScreenProps = {
    navigation: NavigationProp<any>
}

export const EditMyCareerScreenMain: React.FC<EditMyCareerScreenProps> = ({ navigation }) => {

    const { appState: { user, career } } = useAppContext()
    const [error, setError] = React.useState<string | null>(null)
    const [editEducationScreenPayload, setEditEducationScreenPayload] = React.useState<IUserCareer | undefined>()
    const [currentScreen, setCurrentScreen] = React.useState<boolean | undefined>()

    const handleEditPress = (editEducationScreenPayload: IUserCareer) => {
        setCurrentScreen(true)
        setEditEducationScreenPayload(editEducationScreenPayload)
    }

    const handleAddPress = () => {
        setCurrentScreen(false)
    }

    const handleBackPress = () => {
        setCurrentScreen(undefined)
    }

    if (!user) {
        return <></>
    }
    if (error) {
        return <Text>{ error }</Text>
    }

    return (
        <View style={ styles.container }>
            { currentScreen === undefined ? (
                <EditMyCareerScreen
                    navigation={ navigation }
                    currentScreen={ currentScreen }
                    onEditPress={ handleEditPress }
                    onAddPress={ handleAddPress }
                />
            ) : currentScreen === true ? (
                <EditCareerScreen
                    navigation={ navigation }
                    selectedCareer={ editEducationScreenPayload }
                    handleBackPress={ handleBackPress }

                />
            ) : (
                <AddCareerScreen
                    navigation={ navigation }
                    handleBackPress={ handleBackPress }

                />
            ) }
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f4f4f4",
        color: "#333",
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
})