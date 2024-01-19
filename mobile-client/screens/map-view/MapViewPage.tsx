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
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import { ImagePickerOptions, ImagePickerResult } from "expo-image-picker"
import { Button, Input, CheckBox } from "@rneui/themed"
import { ImageCarousel } from "../common/ImageCarousel"
import { APIService } from "../../services/api.service"
import { useProductsUpdateWatch } from "../../services/hooks/useProductsUpdateWatch"
import { NavigationProp } from "@react-navigation/native"
import { MyColors } from "../../services/ColorsContants"
import { Spinner } from "../common/Spinner"
import MapView, { Heatmap, Marker, Region } from "react-native-maps"
import * as Location from "expo-location"
import Icon from "react-native-vector-icons/FontAwesome"
import { useAppContext } from "../../services/context/AppContext"


const userDefaultProfileImg = require("../../assets/images/user-profile-grey.png")
const avatarImg = require("../../assets/demo/avatar.png")
const avatar2Img = require("../../assets/demo/avatar2.png")


const initialRegion: Region = {
    latitude: 19.113044421278953,
    latitudeDelta: 0.4577874272627369,
    longitude: 72.88941169157624,
    longitudeDelta: 0.24505633860826492
}

type MapViewScreenProps = {
    navigation: NavigationProp<any>
}

export function MapViewScreen({ navigation }: MapViewScreenProps) {

    const { appState: { user }, setAuth } = useAppContext()

    if (!user) {
        return <></>
    }

    const [mapRegion, setMapRegion] = useState<Region>(initialRegion)
    const [location, setLocation] = useState<Location.LocationObject | null>()
    const [loading, setLoading] = useState<boolean>(true)
    const [locationError, setLocationError] = useState<string | null>()
    const [locationDelta, setLocationDelta] = useState<number>()

    const loadUserLocation = async () => {
        setLoading(true)
        setLocation(null)
        setLocationError(null)
        console.log("checking location access")
        const { status: backgroundAccess } = await Location.getBackgroundPermissionsAsync()
        if (backgroundAccess !== "granted") {
            console.error("Background Location permission not granted. requesting...")
            const { status: backgroundAccess } = await Location.requestBackgroundPermissionsAsync()
            console.log("Background location access status :", backgroundAccess)
            if (backgroundAccess !== "granted") {
                console.error("Background Location permission not granted")
                setLocationError("Permission to access location was denied")
                setLoading(false)
                return
            }
        }
        console.log("Background Location permission granted")
        const { status: foregroundAccess } = await Location.getForegroundPermissionsAsync()
        if (foregroundAccess !== "granted") {
            console.error("Foreground Location permission not granted. requesting...")
            const { status: foregroundAccess } = await Location.requestForegroundPermissionsAsync()
            console.log("Foreground location access status :", foregroundAccess)
            if (foregroundAccess !== "granted") {
                console.error("Foreground Location permission not granted")
                setLocationError("Permission to access location was denied")
                setLoading(false)
                return
            }
        }
        console.log("Foreground Location permission granted")
        console.log("checking if location services are enabled")
        const areServicesEnabled = await Location.hasServicesEnabledAsync()
        if (areServicesEnabled) {
            console.log("Location services are enabled")
        } else {
            console.error("Location services are disabled")
            setLocationError("Location services are disabled")

            setLoading(false)
            return
        }
        const location: Location.LocationObject | null = await Location.getCurrentPositionAsync()
        console.log("got location : ", location)
        if (location) {
            setLocation(location)
            setLoading(false)
        } else {
            setLocationError("Unable to fetch your location")
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUserLocation().catch(console.error)
    }, [])

    if (locationError) {
        return (
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Text
                    style={{
                        color: "#707070",
                        fontSize: 18,
                        marginBottom: 30,
                    }}>
                    {locationError}
                </Text>
                <Button
                    onPress={() => {
                        loadUserLocation().catch(console.error)
                    }}
                    type='clear'
                    style={{
                    }}
                    color={"#707070"}
                >
                    Try Again
                </Button>
            </View>
        )
    }

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Text
                    style={{
                        color: "#707070",
                        fontSize: 18,
                        height: 35,
                    }}>
                    Fetching your location...
                </Text>
                <View
                    style={{
                        height: 30
                    }}>
                    <Spinner size={16} color='#707070' />
                </View>
            </View>
        )
    }

    if (!location || location === null) {
        return <></>
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={initialRegion}
                region={mapRegion}
                onRegionChange={(r) => {
                    setLocationDelta((r.latitudeDelta < r.longitudeDelta) ? r.latitudeDelta : r.longitudeDelta)
                }}
                onRegionChangeComplete={(r) => {
                    console.log(r)
                    setMapRegion(r)
                }}
                mapType='standard'
                userInterfaceStyle='light'

                provider={"google"}>

                {(location) && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "green",
                            minHeight: 100,
                            minWidth: 100,
                            height: 100,
                            width: 100,
                            maxHeight: 100,
                            maxWidth: 100,
                        }}>
                        <Image source={avatarImg} style={{ width: 70, height: 70 }} />
                        {(locationDelta && locationDelta < 0.1) && (
                            <View
                                style={{
                                    backgroundColor: "#fafafa",
                                    marginTop: 20,
                                    padding: 10,
                                    borderRadius: 5,
                                }}>
                                <Text style={{}}>{user.firstName} {user.lastName}</Text>
                            </View>
                        )}
                    </Marker>
                )}

            </MapView>
            <View style={{ position: "absolute", bottom: 0, left: 0, padding: 20 }}>
                <Button
                    color={"#eee"}
                    onPress={() => {
                        setMapRegion({
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        })
                    }}
                    buttonStyle={{
                        borderRadius: 10,
                        width: 60,
                        height: 60,
                        borderWidth: 1,
                        borderColor: "#ccc",
                    }}>
                    <Icon name="map-pin" color={"#333"} size={26} />
                </Button>
            </View>
        </View>
    )
}