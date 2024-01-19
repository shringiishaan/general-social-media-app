import * as React from "react"
import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { Button, Icon, Input } from "@rneui/themed"
import { useEffect, useState, useRef } from "react"
import { BigNextButton } from "../../screens/common/BigNextButton"
import { validateName, validatePhoneNumber } from "../../services/validations"
import { APIService } from "../../services/api.service"
import { useAppContext } from "../../services/context/AppContext"

export function SignUpPage({ navigation }: any): JSX.Element {

    const { appState: { user }, setAuth } = useAppContext()

    useEffect(() => {
        if (user) {
            navigation.navigate("AvatarGeneratorScreen")
        }
    }, [user])

    const [page, setPage] = useState<number>(1)
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")

    function finalSubmit(password: string) {
        setPage(0)
        APIService.signUp(
            firstName,
            lastName,
            phoneNumber,
            "MALE",
            new Date(),
            1,
            password
        ).then(({ user, token }) => {
            setAuth(user, token)
        }).catch(e => {
            console.error(e)
        })
    }
    function jumpToSignIn() {
        navigation.navigate("SignInPage")
    }
    switch (page) {
        case 1: return (
            <GetPhoneNumberPage
                onSubmit={ (phoneNumber: string) => {
                    setPhoneNumber(phoneNumber)
                    setPage(2)
                } }
                jumpToSignIn={ jumpToSignIn } />
        )
        case 2: return (
            <GetNamePage
                onSubmit={ (firstName: string, lastName: string) => {
                    setFirstName(firstName)
                    setLastName(lastName)
                    setPage(3)
                } } />
        )
        case 3: return (
            <GetPasswordPage
                onSubmit={ (password: string) => {
                    finalSubmit(password)
                } } />
        )
        default: return (
            <View
                style={ {
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent"
                } }>
                <Button
                    title={ "Signing Up.." }
                    type='clear'
                    loading />
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
            </View>
        )
    }
}

function GetPhoneNumberPage({ onSubmit, jumpToSignIn }: { onSubmit: (phoneNumber: string) => void, jumpToSignIn: () => void }) {

    const input = useRef(null)
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [displaySignInLink, setDisplaySignInLink] = useState<boolean>(false)

    useEffect(() => {
        if (input.current !== null) {
            (input.current as any).setNativeProps({
                pattern: "[0-9]*",
                inputmode: "numeric"
            })
        }
    }, [])

    return (
        <View style={ styles.container }>
            <View style={ { display: "flex", alignItems: "center", backgroundColor: "transparent" } }>
                <Text style={ { ...styles.title, marginBottom: 40, color: "#666" } }>
                    Can we get your phone number?
                </Text>
                <Input
                    ref={ input }
                    placeholder='Phone Number'
                    label="Phone Number"
                    value={ phoneNumber }
                    onChangeText={ (value) => setPhoneNumber(value) }
                    containerStyle={ { marginTop: 30 } }
                    disabled={ loading }
                    labelStyle={ { color: "#555" } }
                    errorMessage={ error }
                    inputStyle={ {
                        fontSize: 22,
                        lineHeight: 22,
                        paddingVertical: 10,
                    } }
                />
            </View>
            <View style={ { marginTop: 20, backgroundColor: "transparent" } }>
                <BigNextButton
                    loading={ loading }
                    disabled={ loading }
                    onPress={ () => {
                        setError("")
                        setDisplaySignInLink(false)
                        if (validatePhoneNumber(phoneNumber)) {
                            setLoading(true)
                            APIService.checkPhoneNumberExists(phoneNumber).then((exists: boolean) => {
                                setLoading(false)
                                if (exists) {
                                    setDisplaySignInLink(true)
                                    setError("You're already registered")
                                } else {
                                    onSubmit(phoneNumber)
                                }
                            }).catch(e => setError("Try again later"))
                        } else {
                            setError("Invalid Phone Number")
                        }
                    } } />
            </View>
            { displaySignInLink && (
                <TouchableOpacity
                    disabled={ loading }
                    style={ { marginTop: 30 } }
                    onPress={ () => { jumpToSignIn() } }>
                    <Text
                        style={ {
                            fontSize: 14,
                            color: "#666",
                            textDecorationStyle: "double",
                            lineHeight: 18,
                            textDecorationLine: "underline",
                            alignSelf: "center"
                        } }>
                        Try Sign In Instead?
                    </Text>
                </TouchableOpacity>
            ) }
        </View>
    )
}

function GetPasswordPage({ onSubmit }: { onSubmit: (password: string) => void }) {

    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    return (
        <View style={ styles.container }>
            <StatusBar style={ Platform.OS === "ios" ? "light" : "auto" } />
            <View style={ { display: "flex", alignItems: "center", backgroundColor: "transparent" } }>
                <Text style={ { ...styles.title, marginBottom: 40, color: "#666" } }>
                    Enter a secure password
                </Text>
                <Input
                    placeholder='Password'
                    label="Password"
                    labelStyle={ { color: "#555" } }
                    containerStyle={ { marginTop: 30 } }
                    value={ password }
                    onChangeText={ (text) => setPassword(text) }
                    errorMessage={ error }
                    inputStyle={ {
                        fontSize: 22,
                        lineHeight: 22,
                        paddingVertical: 10,
                    } }
                />
            </View>
            <View style={ { marginTop: 20, backgroundColor: "transparent" } }>
                <BigNextButton
                    onPress={ () => {
                        if (!password) {
                            setError("Please enter password")
                        } else if (password.length < 6) {
                            setError("Password seem too small")
                        } else {
                            setError("")
                            onSubmit(password)
                        }
                    } } />
            </View>
        </View>
    )
}

function GetNamePage({ onSubmit }: { onSubmit: (firstName: string, lastName: string) => void }) {

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [error, setError] = useState<string>("")

    return (
        <View style={ styles.container }>
            <StatusBar style={ Platform.OS === "ios" ? "light" : "auto" } />
            <View style={ { display: "flex", alignItems: "center", backgroundColor: "transparent" } }>
                <Text style={ { ...styles.title, marginBottom: 40, color: "#666" } }>
                    What should we call you?
                </Text>
                <Input
                    value={ firstName }
                    onChangeText={ (value) => setFirstName(value) }
                    placeholder='First Name'
                    label="First Name"
                    errorMessage={ error }
                    labelStyle={ { color: "#555" } }
                    containerStyle={ { marginTop: 30 } }
                    inputStyle={ {
                        fontSize: 22,
                        lineHeight: 22,
                        paddingVertical: 10,
                    } }
                />
                <Input
                    value={ lastName }
                    onChangeText={ (value) => setLastName(value) }
                    placeholder='Last Name'
                    label="Last Name"
                    errorMessage={ error }
                    labelStyle={ { color: "#555" } }
                    containerStyle={ { marginTop: 10 } }
                    inputStyle={ {
                        fontSize: 22,
                        lineHeight: 22,
                        paddingVertical: 10,
                    } }
                />
            </View>
            <View style={ { marginTop: 20, backgroundColor: "transparent" } }>
                <BigNextButton
                    onPress={ () => {
                        setError("")
                        if (validateName(firstName)) {
                            if (validateName(lastName)) {
                                onSubmit(firstName, lastName)
                            } else setError("First Name seems too short")
                        } else setError("Last Name seems too short")
                    } } />
            </View>
        </View>
    )
}

function GetUserId({ name, onSubmit }: { name: string, onSubmit: (userId: string) => void }) {

    const [userId, setUserId] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [submitLoader, setSubmitLoader] = useState<boolean>(false)
    const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(true)
    const [suggestions, setSuggestions] = useState<string[]>([])

    useEffect(() => {
        APIService.getUserIdSuggestions(name).then((suggestions: string[]) => {
            setSuggestions(suggestions)
            setLoadingSuggestions(false)
        }).catch(e => { })
    }, [])

    const submitAction = (userId: string) => {
        setUserId(userId)
        setError("")
        if (!userId) {
            setError("Please enter User ID")
        } else if (userId.length < 4) {
            setError("User ID is too short")
        } else if (validateName(userId)) {
            setSubmitLoader(true)
            APIService.checkUserIdExists(userId).then((exists: boolean) => {
                if (exists) {
                    setError("This Username is taken")
                    setSubmitLoader(false)
                } else {
                    onSubmit(userId)
                }
            }).catch(e => { })
        } else setError("Invalid Name")
    }

    return (
        <View style={ styles.container }>
            <StatusBar style={ Platform.OS === "ios" ? "light" : "auto" } />
            <View style={ { display: "flex", alignItems: "center", backgroundColor: "transparent" } }>
                <Text style={ { ...styles.title, marginBottom: 40, color: "#666" } }>
                    Unique Username
                </Text>
                <Input
                    value={ userId }
                    onChangeText={ (value) => setUserId(value) }
                    placeholder='Your User ID'
                    label="Your User ID"
                    errorMessage={ error }
                    disabled={ submitLoader }
                    labelStyle={ { color: "#555" } }
                    containerStyle={ { marginTop: 30 } }
                    inputStyle={ {
                        fontSize: 22,
                        lineHeight: 22,
                        paddingVertical: 10,
                    } }
                />
            </View>
            <View style={ { marginTop: 20, marginBottom: 20, display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap", backgroundColor: "transparent" } }>
                { loadingSuggestions && (
                    <View style={ { width: "100%", backgroundColor: "transparent", paddingVertical: 20 } }>
                        <Button type="clear" color="primary" loading />
                    </View>
                ) }
                { suggestions.map((suggestion: string) => (
                    <Button
                        key={ suggestion }
                        title={ suggestion }
                        type="outline"
                        disabled={ submitLoader }
                        titleStyle={ { color: "#666" } }
                        buttonStyle={ {
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: "#666",
                            paddingHorizontal: 10,
                            paddingVertical: 0
                        } }
                        containerStyle={ {
                            borderRadius: 100,
                            marginRight: 10,
                            marginBottom: 10,
                        } }
                        onPress={ () => {
                            setTimeout(() => {
                                submitAction(suggestion)
                            })
                        } }
                    />
                )) }
            </View>
            <View style={ { marginTop: 20, backgroundColor: "transparent" } }>
                <BigNextButton
                    loading={ submitLoader }
                    disabled={ submitLoader }
                    onPress={ () => submitAction(userId) } />
            </View>
        </View>
    )
}

function GetDescriptionPage({ onSubmit }: { onSubmit: (description: string) => void }) {

    const [description, setDescription] = useState<string>("")
    const [error, setError] = useState<string>("")

    return (
        <View style={ styles.container }>
            <StatusBar style={ Platform.OS === "ios" ? "light" : "auto" } />
            <View style={ { display: "flex", alignItems: "center", backgroundColor: "transparent" } }>
                <Text style={ { ...styles.title, marginBottom: 40, color: "#666" } }>
                    Tell us something about yourself
                </Text>
                <Input
                    value={ description }
                    onChangeText={ (value) => setDescription(value) }
                    label="About Yourself"
                    labelStyle={ { color: "#555" } }
                    numberOfLines={ 8 }
                    inputStyle={ {
                        fontSize: 22,
                        lineHeight: 22,
                        paddingVertical: 10,
                    } }
                />
            </View>
            <View style={ { marginTop: 20, backgroundColor: "transparent" } }>
                <BigNextButton
                    onPress={ () => {
                        setError("")
                        if (description && description.length > 10) {
                            onSubmit(description)
                        } else setError("Atleast 10 characters")
                    } } />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        backgroundColor: "#eee",
        paddingHorizontal: 20,
        paddingVertical: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Poppins"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
})