import * as React from "react"
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from "react-native"
import { APIService } from "../../../services/api.service"
import { useAppContext } from "../../../services/context/AppContext"
import { NavigationProp } from "@react-navigation/native"
import { Spinner } from "../../common/Spinner"
import { ILanguage } from "../../../services/interfaces"
import { EditInterestSearchBar } from "../user-interests/edit-interest-screen/EditInterestSearchBar"
import { editInterestTabsSectionStyles } from "../user-interests/edit-interest-screen/EditIntersetsScreenStyles"
import { interestedInStyles } from "../../../styles/profile-styles/interestedInCard"
import { Button, Icon } from "@rneui/themed"

type EditLanguageScreenProps = {
    navigation: NavigationProp<any>
}

type LanguageObj = {
    language: ILanguage
    selected: number
}

export function EditUserLanguageScreen({ navigation }: EditLanguageScreenProps) {

    const { appState: { user } } = useAppContext()
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)
    const [allLanguage, setAllLanguage] = React.useState<LanguageObj[]>([])
    const [updatedUserLanguages, setUpdatedUserLanguages] = React.useState<LanguageObj[]>([])
    const [userLanguage, setUserLanguage] = React.useState<ILanguage[]>([])
    const [isModified, setIsModified] = React.useState<boolean>(false)

    React.useEffect(() => {
        fetchLanguage()
    }, [])

    const fetchLanguage = async () => {
        try {
            const myLanguages: ILanguage[] = await APIService.getAllLanguagesByUserId()
            const myLanguageNames: string[] = myLanguages.map(l => l.name)
            const allLanguages: ILanguage[] = await APIService.getAllLanguages()

            //temporary array of objects to store all languages and selected languages
            const temporrayArrObj = []
            for (let i = 0; i < allLanguages.length; i++) {
                temporrayArrObj.push({
                    language: allLanguages[i],
                    selected: myLanguageNames.
                        includes(allLanguages[i].name) === true ? 1 : 0,
                })
            }
            setAllLanguage(temporrayArrObj)
            setUserLanguage(myLanguages)
            setUpdatedUserLanguages(temporrayArrObj.filter(i => i.selected === 1))
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    function updateUserLanguages(updatedUserLanguages: LanguageObj[]) {
        const updatedUserLanguageIds: number[] = updatedUserLanguages.
            map(item => item.language.id)

        APIService.updateUserAllLanguageMaps(updatedUserLanguageIds).
            then(updatedUserLanguages => {
            }).catch(error => {
                setError(error)
            }).finally(() => {
                setLoading(false)
            })
    }

    const handleLanguageClick = (language: LanguageObj) => {
        const languagesArr = allLanguage
        language.selected = 1
        setAllLanguage(languagesArr)
        setUpdatedUserLanguages(allLanguage.filter(i => i.selected === 1))
        //check if language is equal to updated languages
        const isLanguageModified = !isLanguageEqual(language, updatedUserLanguages)
        setIsModified(isLanguageModified)
    }

    const deselectLanguageHandler = (language: LanguageObj) => {
        const languagesArr = allLanguage
        language.selected = 0
        setAllLanguage(languagesArr)
        setUpdatedUserLanguages(allLanguage.filter(i => i.selected === 1))

        const isLanguageModified = !isLanguageEqual(language, updatedUserLanguages)
        setIsModified(isLanguageModified)
    }

    //check if language is equal to updated languages
    const isLanguageEqual = (selectedLanguage: LanguageObj, updatedLanguages: LanguageObj[]): boolean => {
        const foundInUpdated = updatedLanguages.
            find(language =>
                language.language.id === selectedLanguage.language.id)
        const foundInSelected = selectedLanguage.language.id === updatedLanguages.
            find(language => language.language.id)?.language.id

        //if language is not found in updated languages or selected languages
        if (!foundInUpdated || !foundInSelected || foundInUpdated.selected !== selectedLanguage.selected) {
            return false
        }

        return true
    }

    if (!user) {
        return null
    }

    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <Text>{ error }</Text>
    }

    const renderLanguageDetail = (language: LanguageObj) => {
        return (
            <TouchableOpacity
                key={ language.language.id }
                onPress={ () => language.selected === 1 ? deselectLanguageHandler : handleLanguageClick }
                style={ {} }>
                <Text style={ editInterestTabsSectionStyles.filteredPills }>
                    { language.language.name }
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={ styles.container }>

            <View
                style={ {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingHorizontal: 5,
                    marginTop: 10,
                    marginBottom: 20,
                } }>
                <Button
                    type='clear'
                    onPress={ () => {
                        navigation.goBack()
                    } }
                    icon={
                        <Icon
                            name="arrow-back"
                            color={ "#707070" } />
                    }
                />
                <Text
                    style={ {
                        marginLeft: 6,
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#707070",
                    } }>
                    Edit My Languages
                </Text>
            </View>
            <EditInterestSearchBar />
            <View
                style={
                    [styles.tagContainer]
                }>
                { allLanguage.map((language) => (
                    <TouchableOpacity
                        key={ language.language.id }
                        style={ [styles.tag, {
                            backgroundColor: language.selected === 1 ? "#2c59ba" : "#fff",
                        }] }
                        onPress={ () => {
                            return language.selected === 1 ?
                                deselectLanguageHandler(language) :
                                handleLanguageClick(language)
                        } }>
                        <Text
                            style={ {
                                color: language.selected === 1 ? "#fff" : "#000",
                            } }>
                            { language.language.name }
                        </Text>
                    </TouchableOpacity>
                )) }
            </View>
            <View style={
                editInterestTabsSectionStyles.tabsContainer
            }>
                <View style={
                    editInterestTabsSectionStyles.filteredInterestContainer
                }>
                    <View style={
                        interestedInStyles.pillsContainer
                    }>
                        { updatedUserLanguages.length > 0 &&
                            updatedUserLanguages.map((i) => renderLanguageDetail(i)) }
                    </View>
                </View>
            </View>
            { isModified && (
                <Button
                    onPress={ () => updateUserLanguages(updatedUserLanguages) }
                    style={ { marginTop: 20 } }>
                    <Text style={ { color: "#fff" } }>Save</Text>
                </Button>
            ) }
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f4f4f4",
        color: "#333",
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
        display: "flex",
        flexDirection: "column",
    },
    tagContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "lavender",
        padding: 18,
        borderRadius: 10,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: "#fff",
        borderRadius: 15,
        display: "flex",
        cursor: "pointer",
    },
    categoryTitle: {
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 5,
    },
})