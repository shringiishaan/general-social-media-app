import * as React from "react"
import {
    StyleSheet,
    View,
    Text,
} from "react-native"
import { NavigationProp } from "@react-navigation/native"
import { IUserEducation } from "../../../services/interfaces"
import { EditMyEducationScreen } from "./EditMyEducationScreen"
import { AddEducationScreen } from "./AddEducationScreen"
import { EditEducationScreen } from "./EditEducationScreen"
import { useAppContext } from "../../../services/context/AppContext"

type EditMyEducationScreenMainProps = {
    navigation: NavigationProp<any>
}


export const EditMyEducationScreenMain: React.FC<EditMyEducationScreenMainProps> = ({ navigation }) => {

    const { appState: { user, education } } = useAppContext()
    const [error, setError] = React.useState<string | null>(null)
    const [currentScreen, setCurrentScreen] = React.useState<boolean | undefined>()
    const [editEducationScreenPayload, setEditEducationScreenPayload] = React.useState<IUserEducation | undefined>()


    const handleEditPress = (editEducationScreenPayload: IUserEducation) => {
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
        <View
            style={ styles.container }
        >
            { currentScreen === undefined ? (
                <EditMyEducationScreen
                    navigation={ navigation }
                    currentScreen={ currentScreen }
                    onEditPress={ handleEditPress }
                    onAddPress={ handleAddPress }
                />
            ) : currentScreen === true ? (
                <EditEducationScreen
                    navigation={ navigation }
                    selectedEducation={ editEducationScreenPayload }
                    handleBackPress={ handleBackPress }
                />
            ) : (

                <AddEducationScreen
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