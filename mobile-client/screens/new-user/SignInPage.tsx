import * as React from "react"
import { View, ScrollView, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { Button } from "@rneui/themed"
import { Input } from "@rneui/themed"
import { CheckBox } from "@rneui/themed"
import { useState, useEffect } from "react"
import { APIService } from "../../services/api.service"
import * as SecureStore from "expo-secure-store"
import { validatePhoneNumber } from "../../services/validations"
import { useAppContext } from "../../services/context/AppContext"

export function SignInPage({ navigation }: any) {

    const { appState: { user }, setAuth } = useAppContext()

    useEffect(() => {
        if (user) {
            setSubmitLoader(false)
            navigation.navigate("BottomTabsRouter")
        }
    }, [user])

    const [phoneNumber, setPhoneNumber] = useState<string>("1234567890")
    const [password, setPassword] = useState<string>("123456789")
    const [agreementChecked, setAgreementChecked] = useState<boolean>(true)
    const [phoneNumberError, setPhoneNumberError] = useState<string>("")
    const [formError, setFormError] = useState<string>("")
    const [submitLoader, setSubmitLoader] = useState<boolean>(false)

    const submitAction = () => {
        setPhoneNumberError("")
        setFormError("")
        const submitPhoneNumber: string = phoneNumber.trim()
        if (!submitPhoneNumber) {
            setPhoneNumberError("Enter your Phone number")
        } else if (!validatePhoneNumber(submitPhoneNumber)) {
            setPhoneNumberError("Incorrect Phone number")
        } else if (!password) {
            setFormError("Please enter password")
        } else {
            setSubmitLoader(true)
            APIService.signIn(submitPhoneNumber, password).then(({ user, token }) => {
                if (user && token) {
                    SecureStore.setItemAsync("AUTH_TOKEN", token).then(() => {
                        setAuth(user, token)
                        setAuth(user, token)
                    }).catch(e => {
                        console.error(e)
                        setFormError("Sign In Failed")
                        setSubmitLoader(false)
                    })
                } else {
                    setFormError("Incorrect Credentials")
                    setSubmitLoader(false)
                }
            }).catch(e => {
                console.error(e)
                setFormError("Sign In Failed")
                setSubmitLoader(false)
            })
        }
    }

    return (
        <View>
            <Button
                icon={ <Icon name="user-plus" style={ { marginRight: 6 } } size={ 16 } color={ "#666" } /> }
                title="OTP Verification"
                type="outline"
                titleStyle={ { color: "#666" } }
                buttonStyle={ {
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: "#666",
                    paddingHorizontal: 30,
                } }
                containerStyle={ { borderRadius: 100, marginTop: 30 } }
                onPress={ () => navigation.navigate("OtpScreen") }
            />
            <ScrollView
                contentContainerStyle={ {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    paddingTop: 100,
                    paddingBottom: 100,
                    backgroundColor: "#eee",
                } }>
                <Text
                    style={ {
                        color: "#777",
                        fontWeight: "700",
                        fontSize: 28,
                        paddingHorizontal: 10,
                    } }>
                    Welcome to Tap!
                </Text>
                <Text
                    style={ {
                        marginTop: 10,
                        marginBottom: 30,
                        color: "#aaa",
                        fontWeight: "600",
                        fontSize: 20,
                        paddingHorizontal: 10,
                    } }>
                    Sign In to Continue
                </Text>
                <Input
                    value={ phoneNumber }
                    onChangeText={ value => setPhoneNumber(value) }
                    label="Phone Number"
                    placeholder='Phone Number'
                    errorMessage={ phoneNumberError }
                    disabled={ submitLoader }
                    containerStyle={ { marginTop: 16 } }
                    labelStyle={ { color: "#555" } }
                    style={ {
                        lineHeight: 22,
                        fontSize: 24,
                        color: "#666"
                    } }
                    inputContainerStyle={ {
                        paddingHorizontal: 0,
                        paddingVertical: 10
                    } }
                />
                <Input
                    value={ password }
                    onChangeText={ value => setPassword(value) }
                    label="Password"
                    placeholder='Password'
                    disabled={ submitLoader }
                    containerStyle={ { marginTop: 10 } }
                    labelStyle={ { color: "#555" } }
                    style={ {
                        lineHeight: 22,
                        fontSize: 24,
                        color: "#666"
                    } }
                    inputContainerStyle={ {
                        paddingHorizontal: 0,
                        paddingVertical: 10
                    } }
                />
                <CheckBox
                    checked={ agreementChecked }
                    onPress={ () => { setAgreementChecked(!agreementChecked) } }
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    disabled={ submitLoader }
                    checkedColor={ "blue" }
                    textStyle={ {
                        fontSize: 15,
                        lineHeight: 20,
                        color: "#888",
                        paddingHorizontal: 10,
                        marginBottom: 20,
                    } }
                    containerStyle={ {
                        backgroundColor: "transparent",
                        padding: 0,
                    } }
                    title="Remember me and keep my session started. By registering you accept our Conditions User Policy and Privacy Notice"
                />
                { formError && (
                    <Text
                        style={ {
                            paddingHorizontal: 30,
                            color: "red",
                            fontSize: 16,
                            marginBottom: 10,
                        } }>
                        * { formError }
                    </Text>
                ) }
                <View style={ { paddingHorizontal: 10, backgroundColor: "inherit" } }>
                    <Button
                        buttonStyle={ { borderRadius: 100, paddingVertical: 12 } }
                        containerStyle={ { borderRadius: 100 } }
                        icon={ <Icon name="sign-in" style={ { marginRight: 12 } } size={ 26 } color="white" /> }
                        title="Sign Me In"
                        raised
                        loading={ submitLoader }
                        disabled={ submitLoader }
                        type='solid'
                        titleStyle={ { color: "white", fontSize: 20 } }
                        onPress={ () => { submitAction() } }
                    />
                </View>
                <View style={ { marginTop: 20, paddingHorizontal: 20, alignItems: "flex-end", backgroundColor: "transparent" } }>
                    <TouchableOpacity disabled={ submitLoader }>
                        <Text
                            style={ {
                                fontSize: 14,
                                color: "#666",
                                textDecorationStyle: "double",
                                lineHeight: 18,
                                textDecorationLine: "underline"
                            } }>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={ { marginTop: 50, marginBottom: 20, display: "flex", alignItems: "center", backgroundColor: "transparent" } }>
                    <Button
                        icon={ <Icon name="user-plus" style={ { marginRight: 6 } } size={ 16 } color={ "#666" } /> }
                        title="Register New Account"
                        type="outline"
                        disabled={ submitLoader }
                        titleStyle={ { color: "#666" } }
                        buttonStyle={ {
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: "#666",
                            paddingHorizontal: 30,
                        } }
                        containerStyle={ { borderRadius: 100 } }
                        onPress={ () => navigation.navigate("SignUpPage") }
                    />
                </View>
                <View style={ { display: "flex", alignItems: "center", backgroundColor: "transparent" } }>
                    <Button
                        icon={ <Icon name="facebook" style={ { marginRight: 10 } } size={ 16 } color={ "#666" } /> }
                        title="Login with Facebook"
                        type="outline"
                        disabled={ submitLoader }
                        titleStyle={ { color: "#666" } }
                        buttonStyle={ {
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: "#666",
                            paddingHorizontal: 30,
                        } }
                        containerStyle={ { borderRadius: 100 } }
                    />
                </View>
            </ScrollView>
        </View>
    )
}