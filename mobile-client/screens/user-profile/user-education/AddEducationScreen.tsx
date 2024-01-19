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


type AddEducationScreenMainProps = {
    navigation: NavigationProp<any>,
    handleBackPress: () => void
}

export const AddEducationScreen: React.FC<AddEducationScreenMainProps> = ({ navigation, handleBackPress }) => {

    const { appState: { user, education: myEducations }, setUserEducations } = useAppContext()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)
    const [collegeName, setCollegeName] = React.useState<string>("")
    const [courseName, setCourseName] = React.useState<string>("")
    const [graduationYear, setGraduationYear] = React.useState<string>("")


    const handleAddEducation = () => {
        if (myEducations) {
            const maxPriority: number = Math.max(...myEducations.map((edu) => edu.priority))
            if (collegeName && courseName) {


                // Create a new education with appropriate priority
                // Set priority to one less than the maximum priority if there are existing educations
                const newEducation: Partial<IUserEducation> = {
                    college: collegeName,
                    course: courseName,
                    priority: myEducations.length > 0 ? maxPriority - 1 : maxPriority + 1,
                    graduationYear: graduationYear
                }

                // decrement priority of all existing educations by 1
                const decrementedPriotityEducations = myEducations && myEducations.map((education: IUserEducation) => {
                    const temp: any = education
                    if (temp.priority !== maxPriority) {
                        temp.priority -= 1
                    }
                    return temp
                })


                const newEducationArrary: Partial<IUserEducation>[] = [newEducation]
                const updatedEducations: IUserEducation[] = [newEducation, ...decrementedPriotityEducations]

                const createMyEducations = (): Promise<void> => {
                    return new Promise<void>((resolve, reject) => {
                        setLoading(true)
                        setError(null)
                        APIService.createMyEducations(newEducationArrary as IUserEducation[]).
                            then(({ myEducations }) => {
                                setUserEducations(myEducations)
                                return APIService.updateMyEducations(updatedEducations).
                                    then(({ myEducations }) => {
                                        setUserEducations(myEducations)
                                        resolve()
                                    }).catch((error) => {
                                        setError(error)
                                        reject(error)
                                    }).finally(() => {
                                        setLoading(false)
                                    })
                            }).catch((error) => {
                                setError(error)
                                reject(error)
                            }).finally(() => {
                                setLoading(false)
                            })
                    })
                }
                createMyEducations().then(() => {
                    handleBackPress()
                })
            }
        }
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
                    Edit Education
                </Text>
                <TouchableOpacity
                    onPress={ handleAddEducation }>
                    <Text
                        style={ {
                            marginLeft: 90,
                            fontSize: 24,
                            fontWeight: "bold",
                            color: collegeName && courseName ? "#707070" : "#ccc",
                        } }>
                        Add
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