import * as React from "react"
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    Pressable,
    TouchableOpacity,
    View,
    Dimensions,
    FlatList,
    Text,
} from "react-native"
import {
    useState,
    useEffect
} from "react"
import * as ImagePicker from "expo-image-picker"
import { ImagePickerOptions, ImagePickerResult } from "expo-image-picker"
import { Button, Input, CheckBox } from "@rneui/themed"
import { ImageCarousel } from "../../common/ImageCarousel"
import { Icon } from "@rneui/base"
import { APIService } from "../../../services/api.service"
import { useProductsUpdateWatch } from "../../../services/hooks/useProductsUpdateWatch"
import { NavigationProp } from "@react-navigation/native"
import { MyColors } from "../../../services/ColorsContants"
import { Spinner } from "../../common/Spinner"
import { useAppContext } from "../../../services/context/AppContext"

const userDefaultProfileImg = require("../../../assets/images/user-profile-grey.png")

const IPOptions: ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    aspect: [1, 1],
    quality: 1,
    allowsMultipleSelection: false,
    selectionLimit: 1,
    orderedSelection: true
}

type EditProfileScreenProps = {
    navigation: NavigationProp<any>
}

export function EditProfileScreen({ navigation }: EditProfileScreenProps) {

    const { appState: { user }, updateUser } = useAppContext()

    if (!user) {
        return <></>
    }

    const [profileImg, setProfileImg] = useState<any>()
    const [profileImgLoader, setProfileImgLoader] = useState<boolean>(false)

    const [firstName, setFirstName] = useState<string>(user.firstName)
    const [nameError, setNameError] = useState<string>("")
    const [firstNameEnabled, setFirstNameEnabled] = useState<boolean>(false)

    const [lastName, setLastName] = useState<string>(user.lastName)
    const [userIdError, setUserIdError] = useState<string>("")
    const [lastNameEnabled, setLastNameEnabled] = useState<boolean>(false)

    const [phoneNumber, setPhoneNumber] = useState<string>(user.phoneNumber)
    const [phoneNumberError, setPhoneNumberError] = useState<string>("")
    const [phoneNumberEnabled, setPhoneNumberEnabled] = useState<boolean>(false)

    const [submitLoader, setSubmitLoader] = useState<boolean>(false)

    // useEffect(() => {
    //     (async () => {
    //         if (user && user.profileImage) {
    //             setProfileImgLoader(true)
    //             const { imageBase64 } = await APIService.getImageBase64(user.profileImage)
    //             setProfileImg(imageBase64)
    //             setProfileImgLoader(false)
    //         }
    //     })()
    // }, [user.profileImage])

    const pickImage = async () => {
        await ImagePicker.getCameraPermissionsAsync()
        await ImagePicker.getMediaLibraryPermissionsAsync()
        //let result: ImagePickerResult = await ImagePicker.launchCameraAsync(IPOptions)
        const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync(IPOptions)
        if (!result.canceled && result.assets.length > 0) {
            setProfileImgLoader(true)
            const { profileImageId } = await APIService.setUserAvatarImage(result.assets[0])
            updateUser({ ...user })
            const { imageBase64 } = await APIService.getImageBase64(profileImageId)
            setProfileImg(imageBase64)
            setProfileImgLoader(false)
        }
    }

    return (
        <View style={ { flex: 1, backgroundColor: "#fff" } }>
            <ScrollView
                style={ { flex: 1 } }
                contentContainerStyle={ {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "stretch",
                    paddingHorizontal: 10,
                    paddingVertical: 50
                } }>

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
                        Edit Profile
                    </Text>
                </View>

                <View
                    style={ {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    } }>
                    { profileImgLoader && (
                        <View
                            style={ {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 120,
                                width: 120,
                                borderRadius: 120,
                            } }>
                            <Spinner />
                        </View>
                    ) }
                    { !profileImgLoader && (
                        <Image
                            source={ profileImg ? { uri: profileImg } : userDefaultProfileImg }
                            style={ {
                                height: 120,
                                width: 120,
                                borderRadius: 120,
                                backgroundColor: "transparent"
                            } }
                        />
                    ) }
                    <Button
                        title="Set Image"
                        type='clear'
                        color={ "primary" }
                        onPress={ () => pickImage() }
                    />
                </View>
                <View>
                    <Input
                        value={ firstName }
                        onChangeText={ value => setFirstName(value) }
                        label="First Name"
                        placeholder='First Name'
                        errorMessage={ nameError }
                        disabled={ submitLoader || !firstNameEnabled }
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
                        rightIcon={ !firstNameEnabled ? (
                            <Button
                                onPress={ () => setFirstNameEnabled(true) }
                                type='clear'
                                icon={ <Icon name="edit" color={ MyColors.INFO } type='FontAwesome5' /> } />
                        ) : (
                            <View
                                style={ {
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center"
                                } }>
                                <Button
                                    type='clear'
                                    onPress={ () => {
                                        console.log("updating first name")
                                        APIService.updateUserFirstName(firstName).then(() => {
                                            console.log("updated first name")
                                            updateUser({ ...user, lastName })
                                            setLastNameEnabled(false)
                                        }).catch(console.error)
                                    } }
                                    icon={ <Icon name="check-circle" color={ MyColors.SUCCESS } type='FontAwesome5' /> } />
                                <Button
                                    type='clear'
                                    onPress={ () => {
                                        setFirstName(user.firstName)
                                        setFirstNameEnabled(false)
                                    } }
                                    icon={ <Icon name="cancel" color={ MyColors.WARNING } type='FontAwesome5' /> } />
                            </View>
                        ) } />
                    <Input
                        value={ lastName }
                        onChangeText={ value => setLastName(value) }
                        label="Last Name"
                        placeholder='Last Name'
                        errorMessage={ userIdError }
                        disabled={ submitLoader || !lastNameEnabled }
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
                        rightIcon={ !lastNameEnabled ? (
                            <Button
                                onPress={ () => setLastNameEnabled(true) }
                                type='clear'
                                icon={ <Icon name="edit" color={ MyColors.INFO } type='FontAwesome5' /> } />
                        ) : (
                            <View
                                style={ {
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center"
                                } }>
                                <Button
                                    type='clear'
                                    onPress={ () => {
                                        console.log("updating last name")
                                        APIService.updateUserLastName(lastName).then(() => {
                                            console.log("updated last name")
                                            updateUser({ ...user, lastName })
                                            setLastNameEnabled(false)
                                        }).catch(console.error)
                                    } }
                                    icon={ <Icon name="check-circle" color={ MyColors.SUCCESS } type='FontAwesome5' /> } />
                                <Button
                                    type='clear'
                                    onPress={ () => {
                                        setLastName(user.lastName)
                                        setLastNameEnabled(false)
                                    } }
                                    icon={ <Icon name="cancel" color={ MyColors.WARNING } type='FontAwesome5' /> } />
                            </View>
                        ) }
                    />
                    <Input
                        value={ phoneNumber }
                        onChangeText={ value => setPhoneNumber(value) }
                        label="Phone Number"
                        placeholder='Phone Number'
                        errorMessage={ phoneNumberError }
                        disabled={ submitLoader || !phoneNumberEnabled }
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
                        rightIcon={ !phoneNumberEnabled ? (
                            <Button
                                onPress={ () => setPhoneNumberEnabled(true) }
                                type='clear'
                                icon={ <Icon name="edit" color={ MyColors.INFO } type='FontAwesome5' /> } />
                        ) : (
                            <View
                                style={ {
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center"
                                } }>
                                <Button
                                    type='clear'
                                    onPress={ () => {
                                        //TODO
                                        setPhoneNumberEnabled(false)
                                    } }
                                    icon={ <Icon name="check-circle" color={ MyColors.SUCCESS } type='FontAwesome5' /> } />
                                <Button
                                    type='clear'
                                    onPress={ () => {
                                        setPhoneNumber(user.phoneNumber)
                                        setPhoneNumberEnabled(false)
                                    } }
                                    icon={ <Icon name="cancel" color={ MyColors.WARNING } type='FontAwesome5' /> } />
                            </View>
                        ) }
                    />
                </View>
                <View
                    style={ {
                        paddingHorizontal: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between"
                    } }>
                    <Button
                        type="clear"
                        buttonStyle={ {
                            borderRadius: 10,
                            marginTop: 30,
                        } }
                        color={ "#707070" }
                        onPress={ () => {
                            navigation.navigate("EditMyMapPinsScreen")
                        } }>
                        Edit My Pins on Map
                    </Button>
                    <Button
                        type="clear"
                        buttonStyle={ {
                            borderRadius: 10,
                            marginTop: 30,
                        } }
                        color={ "#707070" }
                        onPress={ () => {
                            navigation.navigate("EditUserInterestTagsScreen")
                        } }>
                        Edit My Interests
                    </Button>
                    <Button
                        type="clear"
                        buttonStyle={ {
                            borderRadius: 10,
                            marginTop: 30,
                        } }
                        color={ "#707070" }
                        onPress={ () => {
                            navigation.navigate("EditUserLanguageScreen")
                        } }>
                        Edit My Languages
                    </Button>
                    <Button
                        type="clear"
                        buttonStyle={ {
                            borderRadius: 10,
                            marginTop: 30,
                        } }
                        color={ "#707070" }
                        onPress={ () => {
                            navigation.navigate("EditMyCareerScreen")
                        } }>
                        Edit My Career Section
                    </Button>
                    <Button
                        type="clear"
                        buttonStyle={ {
                            borderRadius: 10,
                            marginTop: 30,
                        } }
                        color={ "#707070" }
                        onPress={ () => {
                            navigation.navigate("EditMyEducationScreenMain")
                        } }>
                        Edit My Education Section
                    </Button>
                </View>
                <View
                    style={ {
                        paddingHorizontal: 5,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    } }>
                    <Button
                        icon={
                            <Icon
                                name="arrow-back"
                                color={ "#fff" }
                                style={ { marginRight: 8 } }
                            />
                        }
                        buttonStyle={ {
                            borderRadius: 10,
                            marginTop: 30,
                        } }
                        color={ "#707070" }
                        iconPosition='left'
                        onPress={ () => { navigation.goBack() } }>
                        Go Back
                    </Button>
                </View>

            </ScrollView>
        </View>
    )
}