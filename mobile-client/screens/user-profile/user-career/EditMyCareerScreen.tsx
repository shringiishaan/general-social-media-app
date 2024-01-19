import * as React from "react"
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native"
import { APIService } from "../../../services/api.service"
import { NavigationProp } from "@react-navigation/native"
import { Spinner } from "../../common/Spinner"
import { IUserCareer } from "../../../services/interfaces"
import { Spacing } from "../../../styles/Spacing"
import { borderRadius } from "../../../styles/Radius"
import { Button, Icon } from "@rneui/themed"
import { useAppContext } from "../../../services/context/AppContext"



type EditMyCareerScreenProps = {
    navigation: NavigationProp<any>
    currentScreen: boolean | undefined
    onAddPress: () => void
    onEditPress: (editEducationScreenPayload: IUserCareer) => void
}

export const EditMyCareerScreen: React.FC<EditMyCareerScreenProps> = ({ navigation, onAddPress, onEditPress }) => {

    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)
    const [myCareers, setMyCareers] = React.useState<IUserCareer[]>([])
    const { appState: { user, career: myCareer }, setUserCareer } = useAppContext()


    React.useEffect(() => {
        loadMyCareers()
    }, [])

    const loadMyCareers = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            setLoading(true)
            setError(null)
            APIService.getAllUserCareersByUserId().then((myCareers) => {
                setMyCareers(myCareers)
                setUserCareer(myCareers)
                resolve()
            }).catch((error) => {
                setError(error)
                reject(error)
            }).finally(() => {
                setLoading(false)
            })
        })
    }

    const handleEditPress = (editEducationScreenPayload: IUserCareer) => {
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
                    My Career
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
                    You can only show one career on your profile at a time
                </Text>
            </View>
            <TouchableOpacity onPress={ onAddPress }
                style={ {
                    ...styles.tag,
                    width: 315,
                    marginHorizontal: 15,
                    marginVertical: 15
                } }>
                <Text
                    style={ {
                        fontSize: 20
                    } }>
                    Add Career
                </Text>
                <View
                    style={ {
                        marginLeft: 195
                    } }>
                    <Icon
                        name="chevron-right"
                        type='FontAwesome5'
                        color={ "#ccc" } />
                </View>
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
                        <View style={ { flex: 1 } }>
                            { myCareers.map((career: IUserCareer) => (
                                <TouchableOpacity
                                    key={ career.id }
                                    style={ styles.tag }
                                >
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
                                            { career.industryId }
                                        </Text>
                                        <Text
                                            style={ {
                                                color: "#666"
                                            } }>
                                            { career.jobRoleId }{ career.year && (
                                                <Text>,{ career.year }</Text>
                                            ) }</Text>
                                    </View>
                                    <View style={ { marginTop: 5, paddingLeft: 40 } }>
                                        <Icon name="chevron-right" type='FontAwesome5' color={ "#ccc" }
                                            onPress={ () => { handleEditPress(career) } }
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
        flexDirection: "row",
        flexWrap: "wrap",
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginRight: 8,
        flexDirection: "row",
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