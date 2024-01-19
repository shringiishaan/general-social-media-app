import * as React from "react"
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text, FlatList,
} from "react-native"
import { APIService } from "../../../services/api.service"
import { NavigationProp } from "@react-navigation/native"
import { Spinner } from "../../common/Spinner"
import { IIndustry, IJobRole } from "../../../services/interfaces"
import { borderRadius } from "../../../styles/Radius"
import { Button, Icon, Input } from "@rneui/themed"
import { useAppContext } from "../../../services/context/AppContext"


type EditMyCareerScreenProps = {
    navigation: NavigationProp<any>,
    handleBackPress: () => void
}

export const AddCareerScreen: React.FC<EditMyCareerScreenProps> = ({ navigation, handleBackPress }) => {

    const { appState: { user, career: myCareer }, setUserCareer } = useAppContext()
    const [careerYear, setCareerYear] = React.useState<string | undefined>(" ")
    const [industries, setIndustries] = React.useState<IIndustry[]>([])
    const [selectedIndustry, setSelectedIndustry] = React.useState<IIndustry>()
    const [jobRoles, setJobRoles] = React.useState<IJobRole[]>([])
    const [selectedJobRoles, setselectedJobRoles] = React.useState<IJobRole>()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)


    React.useEffect(() => {
        loadMyIndustry()
        loadMyJobRole()
    }, [])


    const loadMyIndustry = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            setLoading(true)
            setError(null)
            APIService.getAllIndustries().then((allIndustries) => {
                setIndustries(allIndustries)
                resolve()
            }).catch((error) => {
                setError(error)
                reject(error)
            }).finally(() => {
                setLoading(false)
            })
        })
    }


    const loadMyJobRole = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            setLoading(true)
            setError(null)
            APIService.getAllJobRoles().then((allJobRoles) => {
                setJobRoles(allJobRoles)
                resolve()
            }).catch((error) => {
                setError(error)
                reject(error)
            }).finally(() => {
                setLoading(false)
            })
        })
    }


    const handleAddCareer = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            setLoading(true)
            setError(null)
            APIService.createMyCareers([{
                industryId: selectedIndustry!.id,
                jobRoleId: selectedJobRoles!.id,
                priority: 0,
                year: parseInt(careerYear!)
            }]).then((myCareer) => {
                setUserCareer(myCareer)
                resolve()
            }).catch((error) => {
                setError(error)
                reject(error)
            }).finally(() => {
                setLoading(false)
            })
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
                    Edit Career
                </Text>
                <TouchableOpacity
                    onPress={ () => { } }>
                    <Text
                        style={ {
                            marginLeft: 90,
                            fontSize: 24,
                            fontWeight: "bold",
                            color: myCareer && careerYear ? "#707070" : "#ccc",
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
                    <View
                        style={ {
                            marginTop: 50,
                            flexDirection: "row",
                            marginHorizontal: 10,
                            marginBottom: 20
                        } }>
                        <Dropdown<IIndustry>
                            data={ industries }
                            onSelect={ setSelectedIndustry }
                            placeholder="Select Industry"
                            selectedValue={ selectedIndustry }
                        />
                        <Dropdown<IJobRole>
                            data={ jobRoles }
                            onSelect={ setselectedJobRoles }
                            placeholder="Select Job Role"
                            selectedValue={ selectedJobRoles }
                        />
                    </View>

                    <TouchableOpacity
                        style={ {
                            backgroundColor: "#fff",
                            borderRadius: 20,
                            height: 40,
                            marginTop: 10
                        } } >
                        <Input
                            value={ careerYear }
                            onChangeText={ setCareerYear }
                            placeholder="Year"
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
                            marginHorizontal: 20,
                            marginVertical: 20
                        } }>
                        <Button
                            title={ "Save" }
                            buttonStyle={ { borderRadius: 20 } }
                            disabledStyle={ {
                                backgroundColor: "red"
                            } }
                            onPress={ handleAddCareer } />
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
    dropdown: {
        position: "absolute",
        top: 50,
    },
    dropdownItem: {
        padding: 10,
        fontSize: 16,
        color: "#707070",
        backgroundColor: "#fff",
    },
    button: {
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#efefef",
        width: "90%",
        borderRadius: 20,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    buttonText: {
        flex: 1,
        textAlign: "center",
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

interface DropdownProps<T> {
    data: T[]
    onSelect: (item: T) => void
    placeholder: string
    selectedValue: T | undefined
}

const Dropdown = <T extends { id: number; name: string }>({ data, onSelect, placeholder, selectedValue }: DropdownProps<T>) => {
    const [visible, setVisible] = React.useState(false)

    const handleItemPress = (item: T) => {
        onSelect(item)
        setVisible(false)
    }

    const renderDropdownItem = ({ item }: { item: T }) => (
        <TouchableOpacity onPress={ () => handleItemPress(item) }>
            <Text style={ [
                styles.dropdownItem,
                selectedValue && selectedValue.id === item.id && { backgroundColor: "lavender" },
            ] }
            >{ item.name }</Text>
        </TouchableOpacity>
    )

    return (
        <View style={ { flex: 1 } }>
            <TouchableOpacity style={ styles.button } onPress={ () => setVisible(!visible) }>
                { visible ? (
                    <FlatList
                        data={ data }
                        keyExtractor={ (item) => item.id.toString() }
                        renderItem={ renderDropdownItem }
                    />
                ) : (
                    <>
                        <Text style={ styles.buttonText }>{ selectedValue ? selectedValue.name : placeholder }</Text>
                        <Icon type='font-awesome' name='chevron-down' size={ 10 } />
                    </>
                ) }
            </TouchableOpacity>
        </View>
    )
}