import * as React from "react"
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from "react-native"
import { APIService } from "../../../services/api.service"
import { NavigationProp } from "@react-navigation/native"
import { Spinner } from "../../common/Spinner"
import { IUserEducation } from "../../../services/interfaces"
import { borderRadius } from "../../../styles/Radius"
import { Button, Icon, Input } from "@rneui/themed"
import { useAppContext } from "../../../services/context/AppContext"

type EditEducationScreenProps = {
    navigation: NavigationProp<any>,
    selectedEducation: IUserEducation | undefined,
    handleBackPress: () => void
}

export const EditEducationScreen: React.FC<EditEducationScreenProps> = ({ navigation, selectedEducation, handleBackPress }) => {

    const { appState: { user, education: myEducations }, setUserEducations } = useAppContext()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)
    const [collegeName, setCollegeName] = React.useState<string>("")
    const [courseName, setCourseName] = React.useState<string>("")
    const [graduationYear, setGraduationYear] = React.useState<string>("")
    const educationId: number | undefined = selectedEducation?.id


    React.useEffect(() => {
        if (selectedEducation && myEducations && myEducations.length > 0) {
            setCollegeName(selectedEducation.college ?? "")
            setCourseName(selectedEducation.course ?? "")
            setGraduationYear(selectedEducation.graduationYear ?? "")
        }
    }, [])


    const updateMyEducations = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {

            const newEducation: Partial<IUserEducation> = {
                college: collegeName,
                course: courseName,
                graduationYear: graduationYear
            }

            if (myEducations && myEducations.length > 0) {

                const educationToUpdate = myEducations.find(
                    education => education && education.id === selectedEducation?.id
                )

                if (educationToUpdate) {
                    educationToUpdate.college = newEducation.college
                    educationToUpdate.course = newEducation.course
                    educationToUpdate.graduationYear = newEducation.graduationYear
                    setLoading(true)
                    setError(null)
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
            }
            handleBackPress()
        }
        )
    }


    const handleDeleteEducation = (educationId: number): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            try {
                if (myEducations && myEducations.length > 0) {
                    const updatedEducations = myEducations.filter(education => education.id !== educationId)

                    setLoading(true)
                    setError(null)

                    APIService.deleteMyEducation(educationId)
                        .then((success) => {
                            if (success) {
                                setUserEducations(updatedEducations)
                                resolve()
                                navigation.goBack()
                            } else {
                                setError(error)
                                reject(error)
                            }
                        })
                        .catch((error) => {
                            setError(error as string)
                            reject(error)
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                } else {
                    reject()
                }
            } catch (error) {
                setError(error as string)
                reject(error)
            } finally {
                setLoading(false)
            }
            handleBackPress()
        })
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
                        handleBackPress()
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
                    Edit Education
                </Text>
                <TouchableOpacity
                    onPress={ updateMyEducations }>
                    <Text
                        style={ {
                            marginLeft: 90,
                            fontSize: 24,
                            fontWeight: "bold",
                            color: collegeName && courseName ? "#707070" : "#ccc",
                        } }>
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>


            <View style={ {
                ...borderRadius.lg,
                flexDirection: "row",
                padding: 8,
                marginVertical: 20,
                height: 500
            } }>
                <View style={ {
                    ...borderRadius.xl, flex: 2,
                    padding: 9,
                    paddingVertical: 8,
                } }>
                    <TouchableOpacity
                        style={ {
                            backgroundColor: "#fff",
                            borderRadius: 20,
                            height: 40,
                            marginTop: 10
                        } }
                        onPress={ () => { } }>
                        <Input
                            value={ collegeName }
                            onChangeText={ setCollegeName }
                            placeholder="College Name"
                            containerStyle={ { marginTop: -8 } }
                            style={ {
                                lineHeight: 20,
                                fontSize: 20,
                                color: "#666"
                            } }
                            inputContainerStyle={ {
                                paddingHorizontal: 5,
                                marginTop: 6,
                                paddingVertical: 4,
                                borderBottomWidth: 0,
                            } } />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ {
                            backgroundColor: "#fff",
                            borderRadius: 20,
                            height: 40,
                            marginTop: 10
                        } } onPress={ () => { } }>

                        <Input
                            value={ courseName }
                            onChangeText={ setCourseName }
                            placeholder="Course Name"
                            containerStyle={ { marginTop: -10 } }
                            style={ {
                                lineHeight: 20,
                                fontSize: 20,
                                color: "#666"
                            } }
                            inputContainerStyle={ {
                                paddingHorizontal: 5,
                                marginTop: 6,
                                paddingVertical: 5,
                                borderBottomWidth: 0,
                            } } />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ {
                            backgroundColor: "#fff",
                            borderRadius: 20,
                            height: 40,
                            marginTop: 10
                        } } >
                        <Input
                            value={ graduationYear }
                            onChangeText={ setGraduationYear }
                            placeholder="Graduation Year"
                            containerStyle={ { marginTop: -4 } }
                            style={ {
                                lineHeight: 20,
                                fontSize: 20,
                                color: "#666"
                            } }
                            inputContainerStyle={ {
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                                borderBottomWidth: 0,
                            } } />
                    </ TouchableOpacity>
                    <View
                        style={ {
                            marginTop: 50
                        } }>
                        <View>
                            <Icon name="delete"
                                type='FontAwesome5'
                                size={ 30 }
                                onPress={ () =>
                                    educationId && handleDeleteEducation(educationId) } />
                        </View>
                    </View>
                </View>
            </View >
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
        backgroundColor: "lavender"
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 0,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: "#fff",
        flexDirection: "row",
        borderRadius: 15,
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
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