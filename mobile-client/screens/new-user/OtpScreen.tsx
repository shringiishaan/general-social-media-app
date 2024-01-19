import * as React from "react"
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native"
import { Button } from "@rneui/base"
import { Spinner } from "../common/Spinner"
import { NavigationProp } from "@react-navigation/native"

type OtpScreenProps = {
    navigation: NavigationProp<any>
    route: any
}

export const OtpScreen: React.FC<OtpScreenProps> = ({ navigation }) => {


    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)
    const [otp, setOtp] = React.useState<string[]>(["", "", "", "", ""])
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null)
    const refs = React.useRef<(TextInput | null)[]>([null, null, null, null, null])

    const isAllDigitsEntered = otp.every((digit) => digit !== "")

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 4) {
            refs.current[index + 1]?.focus()
        }
    }

    const handleBackspace = (index: number) => {
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)

        if (index > 0) {
            refs.current[index - 1]?.focus()
        }
    }

    const handleBlur = () => {
        setFocusedIndex(null)
    }
    const handleFocus = (index: number) => {
        setFocusedIndex(index)
    }

    const handleSubmit = () => {
    }

    if (loading) return <Spinner backgroundColor="#f4f4f4" />

    if (error)
        return (
            <View style={ styles.errorContainer }>
                <Button type="clear" onPress={ () => { } }>
                    <Text>Retry</Text>
                </Button>
            </View>
        )

    return (
        <SafeAreaView style={ styles.container }>
            <View>
                <Text style={ styles.description }>Enter your OTP</Text>
                <Text style={ styles.description }>
                    We have sent a 6 digit OTP to your mobile number
                </Text>
                <View style={ styles.otpContainer }>
                    { otp.map((value, index) => (
                        <TextInput
                            key={ index }
                            ref={ (input) => (refs.current[index] = input) }
                            style={ [
                                styles.input,
                                {
                                    borderColor: focusedIndex === index ? "lightgrey" : "black",
                                },
                            ] }
                            value={ value }
                            onChangeText={ (text) => handleOtpChange(text, index) }
                            onKeyPress={ ({ nativeEvent }) => {
                                if (nativeEvent.key === "Backspace") {
                                    handleBackspace(index)
                                }
                            } }
                            onBlur={ handleBlur }
                            onFocus={ () => handleFocus(index) }
                            maxLength={ 1 }
                            keyboardType="numeric"
                        />
                    )) }
                </View>
                <TouchableOpacity
                    style={ [
                        styles.submitButton,
                        {
                            backgroundColor: isAllDigitsEntered ? "#bdeaf5" : "gray",
                        },
                    ] }
                    onPress={ handleSubmit }
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 70,
        backgroundColor: "#fff",
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 40,
        marginTop: 20,
    },
    input: {
        width: 40,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: "center",
        fontSize: 18,
        marginHorizontal: 5,
    },
    description: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#555",
    },
    errorContainer: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },
    submitButton: {
        padding: 15,
        marginTop: 20,
        alignContent: "flex-end",
        alignSelf: "center",
        borderRadius: 10,
    },
})
