import { NavigationProp } from "@react-navigation/native"
import { Icon } from "@rneui/base"
import { Button } from "@rneui/base"
import { Input } from "@rneui/themed"
import * as React from "react"
import {
    ScrollView,
    View,
    Text,
} from "react-native"
import { PopsAPIService } from "../../services/pops-api.service"
import { IPop } from "../../services/interfaces"
import { MyColors } from "../../services/ColorsContants"
import { validatePopText } from "../../services/validations"

type CreateNewPopPageProps = {
    navigation: NavigationProp<any>
}

export const CreateNewPopPage: React.FC<CreateNewPopPageProps> = ({ navigation }) => {

    const [newPopText, setNewPopText] = React.useState<string>("")
    const [error, setError] = React.useState<string>("")
    const [submitLoader, setSubmitLoader] = React.useState<boolean>(false)

    const savePop = () => {
        //TODO ABHA : validation min 10 characters to 500 characters
        setSubmitLoader(true)
        PopsAPIService.createPop({ text: newPopText }).then((newPop: IPop) => {
            setSubmitLoader(false)
            navigation.navigate("PopFeedPage")
        }).catch(e => {
            console.error(e)
            setError("There was some issue")
            setSubmitLoader(false)
        })
    }

    return (
        <View
            style={ [
                { padding: 0, display: "flex", flex: 1, backgroundColor: "#f4f4f4" },
            ] }>
            <ScrollView
                showsVerticalScrollIndicator={ false }
                contentContainerStyle={ {
                    padding: 8,
                    paddingTop: 30,
                    paddingBottom: 100,
                } }
                style={ { margin: 0 } }>
                <View
                    style={ {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                    } }>
                    <Icon
                        name="arrow-left"
                        size={ 36 }
                        color={ "#333" }
                        onPress={ () => {
                            navigation.goBack()
                        } } />
                    <Text
                        style={ {
                            fontSize: 20,
                            marginLeft: 10,
                            color: "#333",
                        } }>
                        Create New Pop
                    </Text>
                </View>
                <View
                    style={ {
                        marginTop: 20
                    } }>
                    <Input
                        label="Pop Text"
                        value={ newPopText }
                        onChangeText={ (value) => {
                            setError("")
                            setNewPopText(value)
                        } }
                        multiline={ true }
                        numberOfLines={ 3 }
                        disabled={ submitLoader }
                        containerStyle={ {} }
                        disabledInputStyle={ {
                            backgroundColor: "#ddd"
                        } }
                        inputContainerStyle={ {
                            borderWidth: 1,
                            borderColor: "#bbb",
                            borderRadius: 4,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            marginTop: 10,
                        } }
                        errorMessage={ error }
                        errorStyle={ {
                            color: MyColors.DANGER
                        } }
                        errorProps={ {} }
                        inputStyle={ {
                            verticalAlign: "top",
                            textAlign: "left",
                        } }
                        labelStyle={ {
                            paddingHorizontal: 8
                        } }
                        labelProps={ {} }
                        leftIconContainerStyle={ {} }
                        rightIconContainerStyle={ {} }
                        placeholder="Something that you want to share with others.."
                    />
                </View>
                <View
                    style={ {
                        marginTop: 20,
                        display: "flex",
                        alignItems: "center"
                    } }>
                    <Button
                        loading={ submitLoader }
                        buttonStyle={ {
                            width: 200,
                            borderRadius: 4
                        } }
                        containerStyle={ {
                            margin: 5,
                        } }
                        disabledStyle={ {
                            borderWidth: 2,
                            borderColor: "blue"
                        } }
                        disabledTitleStyle={ {
                            color: "#00F"
                        } }
                        icon={ <Icon name="check" size={ 20 } color="#fff" style={ { marginRight: 6 } } /> }
                        iconContainerStyle={ {
                            backgroundColor: "#000",
                        } }
                        loadingProps={ { animating: true } }
                        loadingStyle={ {} }
                        onPress={ () => {
                            setError("")
                            if (validatePopText(newPopText)) {
                                savePop()
                            } else {
                                setError("Pop text should be between 10 to 500 characters")
                            }
                        } }
                        title="Upload Pop"
                        titleProps={ {} }
                        titleStyle={ { marginHorizontal: 5 } }
                    />
                </View>
            </ScrollView>
        </View>
    )
}