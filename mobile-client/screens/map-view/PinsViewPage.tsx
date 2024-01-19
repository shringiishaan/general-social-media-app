import * as React from "react"
import {
    StyleSheet,
    View,
    Text,
} from "react-native"
import * as Location from "expo-location"
import Icon from "react-native-vector-icons/FontAwesome"
import MapView, { Marker, Region } from "react-native-maps"
import { Button } from "@rneui/themed"
import { APIService } from "../../services/api.service"
import { NavigationProp } from "@react-navigation/native"
import { Spinner } from "../common/Spinner"
import { IMapPin } from "../../services/interfaces"
import { useAppContext } from "../../services/context/AppContext"

function debounce(fn: (...args: any) => void, delay: number) {
    let timeoutId: NodeJS.Timeout
    return function (...args: any) {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const initialRegion: Region = {
    latitude: 19.113044421278953,
    latitudeDelta: 0.4577874272627369,
    longitude: 72.88941169157624,
    longitudeDelta: 0.24505633860826492
}

type MapViewScreenProps = {
    navigation: NavigationProp<any>
}

export const PinsViewPage: React.FC<MapViewScreenProps> = ({ navigation }) => {

    const { appState: { user } } = useAppContext();
    if (!user) {
        return <></>
    }

    const [mapRegion, setMapRegion] = React.useState<Region>(initialRegion)
    const [location, setLocation] = React.useState<Location.LocationObject | null>()
    const [loading, setLoading] = React.useState<boolean>(true)
    const [mapPins, setMapPins] = React.useState<IMapPin[] | null>([])
    const [locationError, setLocationError] = React.useState<string | null>()
    const [locationDelta, setLocationDelta] = React.useState<number>()

    const debouncedSetLocationDelta = React.useCallback(
        debounce((latitudeDelta, longitudeDelta) => {
            setLocationDelta(Math.min(latitudeDelta, longitudeDelta))
        }, 200),
        []
    )

    const handleRegionChange = React.useCallback((r: Region) => {
        debouncedSetLocationDelta(r.latitudeDelta, r.longitudeDelta)
    }, [debouncedSetLocationDelta])

    const handleRegionChangeComplete = React.useCallback((r: Region) => {
        setMapRegion(r)
    }, [])

    const checkLocationAccess = async () => {
        const { status: backgroundAccess } = await Location.getBackgroundPermissionsAsync()
        if (backgroundAccess !== "granted") {
            const { status } = await Location.requestBackgroundPermissionsAsync()
            if (status !== "granted") return false
        }
        const { status: foregroundAccess } = await Location.getForegroundPermissionsAsync()
        if (foregroundAccess !== "granted") {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") return false
        }
        return await Location.hasServicesEnabledAsync()
    }

    const loadMap = async () => {
        setLoading(true)
        const accessGranted = await checkLocationAccess()
        if (!accessGranted) {
            setLocationError("Permission to access location was denied")
            setLoading(false)
            return
        }
        const currentLocation = await Location.getCurrentPositionAsync()
        setLocation(currentLocation)
        await loadMapPins()
        setLoading(false)
    }

    const loadMapPins = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            APIService.getAllMapPins().then(({ allMapPins, myMapPins }) => {
                if (allMapPins && allMapPins.length) {
                    const selected = allMapPins.slice(0, 20)
                    setMapPins(selected)
                }
                resolve()
            }).catch(reject)
        })
    }

    React.useEffect(() => {
        loadMap().catch(console.error)
        const intervalId = setInterval(() => {
            loadMapPins().catch(console.error)
        }, 5000)
        return () => clearInterval(intervalId)
    }, [])

    if (locationError) {
        return (
            <ErrorView
                error={locationError}
                onRetry={() => {
                    loadMap().catch(console.error)
                }} />
        )
    }

    if (loading) {
        return (
            <LoadingView
                onRetry={() => {
                    loadMap().catch(console.error)
                }} />
        )
    }

    if (!location || !mapPins) {
        return <></>
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={initialRegion}
                region={mapRegion}
                onRegionChange={handleRegionChange}
                onRegionChangeComplete={handleRegionChangeComplete}
                // onRegionChange={(r) => {
                // 	setLocationDelta((r.latitudeDelta < r.longitudeDelta) ? r.latitudeDelta : r.longitudeDelta)
                // }}
                // onRegionChangeComplete={(r) => {
                // 	console.log(r)
                // 	setMapRegion(r)
                // }}
                mapType='standard'
                userInterfaceStyle='light'

                provider={"google"}>

                {(mapPins) && mapPins.map((mapPin: IMapPin) => (
                    <Marker
                        key={mapPin.id}
                        coordinate={{
                            latitude: mapPin.latitude,
                            longitude: mapPin.longitude
                        }}
                        style={styles.centeredView}
                        onPress={() => {
                            console.log("marker clicked", mapPin)
                            navigation.navigate("PinUsersListPage", { mapPinId: mapPin.id })
                        }}>
                        <View style={styles.markerContainer}>
                            <Text style={styles.markerText}>
                                {mapPin.usersCount}
                            </Text>
                        </View>
                        {(locationDelta && locationDelta < 0.05) && (
                            <Text style={styles.darkText}>
                                {mapPin.name}
                            </Text>
                        )}
                    </Marker>
                ))}

            </MapView>
            <View style={styles.floatingBottomBox}>
                <Button
                    color={"#eee"}
                    icon={<Icon name="plus" color={"#333"} size={12} />}
                    iconContainerStyle={styles.floatingBtnIconContainerStyle}
                    onPress={() => {
                        navigation.navigate("EditMyMapPinsScreen")
                    }}
                    buttonStyle={styles.plusButton}>
                    <Text style={styles.floatingBtnText}>
                        CREATE NEW PIN
                    </Text>
                </Button>
            </View>
        </View>
    )
}

const ErrorView: React.FC<{ error: string, onRetry: () => void }> = ({ error, onRetry }) => (
    <View style={styles.centeredView}>
        <Text style={styles.errorMessage}>{error}</Text>
        <Button onPress={onRetry} type='clear' color={"#707070"}>
            Try Again
        </Button>
    </View>
)

const LoadingView: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
    <View style={styles.centeredView}>
        <Text style={styles.normalMessage}>Loading your map...</Text>
        <Spinner size={16} color='#707070' containerStyle={{ maxHeight: 30 }} />
        <Button onPress={onRetry} type='clear' color={"#707070"}>
            Try Again
        </Button>
    </View>
)

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    normalMessage: {
        color: "#707070",
        fontSize: 18,
        height: 35,
    },
    errorMessage: {
        color: "#707070",
        fontSize: 18,
        marginBottom: 30
    },
    markerContainer: {
        backgroundColor: "gold",
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "yellow"
    },
    markerText: {
        color: "#fff",
        fontWeight: "bold"
    },
    darkText: {
        color: "#333"
    },
    plusButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    floatingBottomBox: {
        position: "absolute",
        bottom: 0,
        left: 0,
        padding: 20
    },
    floatingBtnIconContainerStyle: {
        marginLeft: 4
    },
    floatingBtnText: {
        marginLeft: 6,
        fontSize: 14
    }
})