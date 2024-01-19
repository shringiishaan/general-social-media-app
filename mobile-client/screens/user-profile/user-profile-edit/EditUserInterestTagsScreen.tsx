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
import { IUserInterest, IUserInterestCategory, IUserInterestsCollection } from "../../../services/interfaces"
import { useAppContext } from "../../../services/context/AppContext"

type EditUserInterestTagsScreenProps = {
    navigation: NavigationProp<any>
}

export function EditUserInterestTagsScreen({ navigation }: EditUserInterestTagsScreenProps) {

    const { appState: { user }, setAuth } = useAppContext()

    if (!user) {
        return <></>
    }
    const [allInterests, setAllInterests] = useState<IUserInterestsCollection[]>()
    const [selectedInterests, setSelectedInterests] = useState<IUserInterestsCollection[]>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        APIService.getAllInterestTags().then((interests) => {
            setAllInterests(interests)
            setSelectedInterests([])
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    if (!selectedInterests || !allInterests) {
        return (
            <></>
        )
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
                    Edit My Interests
                </Text>
            </View>
            <View
                style={ {
                    backgroundColor: "red"
                } }>
                { selectedInterests.map((interest, index) => (
                    <View key={ index } style={ styles.interestTag }>
                        <Text>
                            { interest.category.name }
                        </Text>
                    </View>
                )) }
            </View>

            { allInterests.map((category, index) => (
                <View key={ index }>
                    <Text style={ styles.categoryTitle }>{ category.category.name }</Text>
                    <View style={ styles.interestTagContainer }>
                        { category.interests.map((interest) => (
                            <TouchableOpacity key={ interest.id } style={ styles.interestTag } onPress={ () => { } }>
                                <Text>
                                    { interest.name }
                                </Text>
                            </TouchableOpacity>
                        )) }
                    </View>
                </View>
            )) }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        color: "#333",
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
        display: "flex",
        flexDirection: "column",
    },
    interestTagContainer: {
        display: "flex",
        flexDirection: "row",
    },
    interestTag: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginRight: 8,
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