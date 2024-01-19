import * as React from "react"
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
} from "react-native"
import { APIService } from "../../../services/api.service"
import { NavigationProp } from "@react-navigation/native"
import { Spinner } from "../../common/Spinner"
import { IUserEducation } from "../../../services/interfaces"
import { Spacing } from "../../../styles/Spacing"
import { borderRadius } from "../../../styles/Radius"
import { Button, Icon } from "@rneui/themed"
import { useAppContext } from "../../../services/context/AppContext"

type EditMyEducationScreenProps = {
    navigation: NavigationProp<any>
    currentScreen: boolean | undefined
    onAddPress: () => void
    onEditPress: (editEducationScreenPayload: IUserEducation) => void
}

type EducationObj = {
    education: IUserEducation
    selected: boolean
}

export const EditMyEducationScreen: React.FC<EditMyEducationScreenProps> = ({ navigation, onAddPress, onEditPress }) => {

    const { appState: { user, education: myEducations }, setUserEducations } = useAppContext()
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)
    const [myEducationsObj, setMyEducationsObj] = React.useState<EducationObj[]>([])


    React.useEffect(() => {
        loadMyEducations()
    }, [])


    const loadMyEducations = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            setLoading(false)
            setError(null)

            APIService.getMyEducations().then(({ myEducations }) => {
                const temporrayArrObj = []
                for (let i = 0; i < myEducations.length; i++) {
                    temporrayArrObj.push({
                        education: myEducations[i],
                        selected: Math.max(...myEducations.map(edu => edu.priority)) === myEducations[i].priority ? true : false,
                    })
                }
                setMyEducationsObj(temporrayArrObj)
                setUserEducations(temporrayArrObj.map(edu => edu.education))
                resolve()
            }).catch((error) => {
                setError(error)
                reject(error)
            }).finally(() => {
                setLoading(false)
            })
        })
    }


    const setTopPriority = (selectedEducationId: number) => {
        setLoading(true)

        const tempArr = myEducationsObj
        const temp = tempArr.find(edu => edu.education.id === selectedEducationId)
        if (temp) {
            tempArr.forEach(edu => {
                if (edu.education.id !== selectedEducationId) {
                    edu.selected = false
                }
            })
            temp.selected = !temp.selected
            temp.education.priority = Math.max(...myEducationsObj.map(edu => edu.education.priority)) + 1
            setMyEducationsObj(tempArr)
        }
        const createMyEducations = (): Promise<void> => {
            return new Promise<void>((resolve, reject) => {
                setError(null)
                if (myEducations !== null) {
                    APIService.updateMyEducations(myEducations).then(({ myEducations }) => {
                        setUserEducations(myEducations)
                        resolve()
                    }).catch((error) => {
                        setError(error)
                        reject(error)
                    }).finally(() => {
                        setLoading(false)
                    })
                }
            })
        }
        createMyEducations()
    }


    const handleEditPress = (editEducationScreenPayload: IUserEducation) => {
        onEditPress(editEducationScreenPayload)
    }


    if (!user) {
        return <></>
    }
    if (loading) {
        return <Spinner />
    }
    if (error) {
        return <Text>{ error }</Text>
    }

    return (
        <View
            style={ styles.container }
        >
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
                        marginLeft: 86,
                        fontSize: 24,
                        fontWeight: "bold",
                    } }>
                    Education
                </Text>
            </View>
            <View
                style={ {
                    justifyContent: "center",
                    padding: 15,
                    paddingVertical: 15
                } }>
                <Text
                    style={ {
                        color: "#707070",
                        fontSize: 20,
                        textAlign: "center"
                    } }>
                    You can only show one institution on your profile at a time
                </Text>
            </View>
            <TouchableOpacity
                onPress={ () => {
                    onAddPress()
                } }
                style={ {
                    ...styles.tag,
                    width: 315,
                    marginHorizontal: 15,
                    marginVertical: 15
                } }>
                <Text
                    style={ { fontSize: 20 } }>
                    Add Education
                </Text>
                <Icon
                    name="chevron-right"
                    type='FontAwesome5'
                    color={ "#ccc" } />
            </TouchableOpacity>
            <View
                style={ {
                    ...borderRadius.lg,
                    flexDirection: "row",
                    padding: 8,
                    height: 550
                } }>
                <View
                    style={ {
                        ...borderRadius.xl, flex: 2,
                        padding: 9,
                        paddingVertical: 8,
                    } }>
                    <ScrollView
                        showsVerticalScrollIndicator={ false }
                        contentContainerStyle={ Spacing.py1Half }>
                        <View
                            style={ { flex: 1 } }>
                            { myEducationsObj.map((education: EducationObj) => (
                                education.selected &&
                                <TouchableOpacity
                                    key={ education.education.id }
                                    style={ styles.tag }
                                    onPress={ () => setTopPriority(education.education.id) }>
                                    <Icon
                                        name="check-circle"
                                        type='FontAwesome5'
                                        color={ "#FFD800" }
                                        style={ { marginTop: 5 } } />
                                    <View
                                        style={ {
                                            flexDirection: "column",
                                            width: 200
                                        } }>
                                        <Text
                                            style={ {
                                                fontWeight: "bold",
                                                fontSize: 17
                                            } }>
                                            { education.education.college }
                                        </Text>
                                        <Text
                                            style={ { color: "#666" } }>
                                            { education.education.course }{ education.education.graduationYear && (
                                                <Text>, { education.education.graduationYear }</Text>
                                            ) }</Text>
                                    </View>
                                    <View
                                        style={ { marginTop: 5 } }
                                    >
                                        <Icon
                                            name="chevron-right"
                                            type='FontAwesome5'
                                            color={ "#ccc" }
                                            onPress={ () => {
                                                handleEditPress(education.education)
                                            } } />
                                    </View>
                                </TouchableOpacity>
                            )) }

                            { myEducationsObj.map((education: EducationObj) => (
                                !education.selected &&
                                <TouchableOpacity
                                    key={ education.education.id }
                                    style={ styles.tag }
                                    onPress={ () => setTopPriority(education.education.id) }>
                                    <Icon
                                        name="check-circle"
                                        type='FontAwesome5'
                                        color={ "#ccc" }
                                        style={ { marginTop: 5 } } />
                                    <View
                                        style={ {
                                            flexDirection: "column",
                                            width: 200
                                        } }>
                                        <Text
                                            style={ {
                                                fontWeight: "bold",
                                                fontSize: 17
                                            } }>
                                            { education.education.college }
                                        </Text>
                                        <Text style={ { color: "#666" } }>
                                            { education.education.course }{ education.education.graduationYear && (
                                                <Text>, { education.education.graduationYear }</Text>
                                            ) }</Text>
                                    </View>
                                    <View
                                        style={ { marginTop: 5 } }
                                    >
                                        <Icon name="chevron-right"
                                            type='FontAwesome5'
                                            color={ "#ccc" }
                                            onPress={ () => {
                                                handleEditPress(education.education)
                                            } }
                                        />
                                    </View>
                                </TouchableOpacity>
                            )) }
                        </View>
                    </ScrollView>
                </View>
            </View>
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
        flexWrap: "wrap",
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: "#fff",
        flexDirection: "row",
        borderRadius: 15,
        display: "flex",
        cursor: "pointer",
        justifyContent: "space-between",

    },
    categoryTitle: {
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 5,
    },
})