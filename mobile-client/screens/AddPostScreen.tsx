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
import { ImageCarousel } from "../screens/common/ImageCarousel"
import { Icon } from "@rneui/base"
import { APIService } from "../services/api.service"
import { useProductsUpdateWatch } from "../services/hooks/useProductsUpdateWatch"
import { NavigationProp } from "@react-navigation/native"

const IPOptions: ImagePickerOptions = {
	mediaTypes: ImagePicker.MediaTypeOptions.Images,
	aspect: [4, 3],
	quality: 1,
	allowsMultipleSelection: true,
	selectionLimit: 5,
	orderedSelection: true
}

type AddPostScreenProps = {
    navigation: NavigationProp<any>
}

export function AddPostScreen({ navigation }: AddPostScreenProps) {

	const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([])
	const [title, setTitle] = useState<string>("")
	const [description, setDescription] = useState<string>("")
	const [enableSale, setEnableSale] = useState<boolean>(false)
	const [handleShippingMyself, setHandleShippingMyself] = useState<boolean>(false)
	const [shippedImmediately, setShippedImmediately] = useState<boolean>(true)
	const [shippingEstimateTimeInDays, setShippingEstimateTimeInDays] = useState<string>("1")
	const [sellingPrice, setSellingPrice] = useState<string>("3500")
	const [maxOrderQuantity, setMaxOrderQuantity] = useState<string>("1")
	const [submitLoader, setSubmitLoader] = useState<boolean>(false)
	const [submitError, setSubmitError] = useState<string>("")
	const updates = useProductsUpdateWatch(s => s.updates)

	const pickImage = async () => {
		await ImagePicker.getCameraPermissionsAsync()
		await ImagePicker.getMediaLibraryPermissionsAsync()
		//let result: ImagePickerResult = await ImagePicker.launchCameraAsync(IPOptions)
		const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync(IPOptions)
		if (!result.canceled) {
			setImages(result.assets)
		}
	}

	useEffect(() => {
		if (!images.length) {
			//pickImage()
		}
	}, [])

	const uploadPost = async () => {
		setSubmitError("")
		setSubmitLoader(true)
		try {
			const imageFileKeys: string[] = []
			for (const image of images) {
				const { imageFileKey } = await APIService.newProductImg(image)
				imageFileKeys.push(imageFileKey)
			}
			const product = await APIService.createProduct(title, description, imageFileKeys)
			updates()
			navigation.goBack()
		} catch (error) {
			console.error(error)
			setSubmitError("Failed to upload Post")
		}
		setSubmitLoader(false)
	}

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{
					display: "flex",
					justifyContent: "center",
					alignItems: "stretch",
					paddingHorizontal: 0,
					paddingVertical: 50
				}}>

				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-start",
						paddingHorizontal: 5,
						marginTop: 10,
						marginBottom: 30,
					}}>
					<Button
						type='clear'
						onPress={() => {
							navigation.goBack()
						}}
						icon={
							<Icon
								name="arrow-back"
								color={"#707070"} />
						}
					/>
					<Text
						style={{
							marginLeft: 6,
							fontSize: 24,
							fontWeight: "bold",
							color: "#707070",
						}}>
                        New Post
					</Text>
				</View>

				{Boolean(images.length) && (
					<View
						style={{
							borderColor: "#d4d4d4",
							borderWidth: 1,
							paddingVertical: 10,
							backgroundColor: "#eaeaea",
							borderRadius: 10,
							overflow: "hidden"
						}}>
						<ImageCarousel images={images} />
					</View>
				)}
				{!images.length && (
					<View
						style={{
							marginHorizontal: 20,
							borderRadius: 10,
							borderColor: "#d4d4d4",
							borderWidth: 1,
							paddingVertical: 50,
							alignItems: "center",
							backgroundColor: "#eaeaea"
						}}>
						<Button
							style={{
								alignSelf: "center",
							}}
							buttonStyle={{
								borderRadius: 10
							}}
							onPress={() => pickImage()}
							icon={
								<Icon
									name="image"
									type='FontAwesome5'
									color={"#fff"}
									style={{ marginRight: 10 }}
								/>
							}
							iconPosition='left'>
                            Pick Images
						</Button>
					</View>
				)}

				<View
					style={{
						display: "flex",
						alignItems: "stretch",
						marginTop: 30,
						paddingHorizontal: 12,
					}}>
					<Input
						value={title}
						onChangeText={(value) => setTitle(value)}
						label="Title"
						placeholder='Eye Catching Title'
						labelStyle={{ color: "#707070", fontSize: 18 }}
						inputStyle={{
							fontSize: 22,
							paddingVertical: 16,
							color: "#555"
						}}
						disabled={submitLoader}
					/>
					<Input
						value={description}
						onChangeText={(value) => setDescription(value)}
						label="Post Description"
						placeholder='What is this post about?'
						labelStyle={{ color: "#707070", fontSize: 18 }}
						inputStyle={{
							fontSize: 22,
							paddingVertical: 16,
							color: "#555",
						}}
						disabled={submitLoader}
					/>
					{/* <View
                        style={{
                            paddingTop: 10,
                        }}>
                        <CheckBox
                            title={`Sell This Product`}
                            checked={enableSale}
                            onPress={() => { setEnableSale(!enableSale) }}
                            iconType="material-community"
                            checkedIcon="checkbox-outline"
                            uncheckedIcon={'checkbox-blank-outline'}
                            containerStyle={{
                                width: '100%',
                                backgroundColor: 'transparent',
                                padding: 0
                            }}
                            textStyle={{ fontSize: 18, color: '#707070' }}
                        />
                        {enableSale && (
                            <View
                                style={{
                                    marginTop: 10,
                                    backgroundColor: '#eee',
                                    borderWidth: 1,
                                    borderColor: '#d4d4d4',
                                    borderRadius: 5,
                                }}>
                                <View
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingTop: 10,
                                    }}>

                                    <Text
                                        style={{
                                            marginBottom: 10,
                                            fontSize: 14,
                                            lineHeight: 20,
                                            color: '#707070',
                                            paddingHorizontal: 10,
                                        }}>
                                        You can allow others to place bids on this product.
                                        It is up to you to accept or reject a bid.
                                    </Text>
                                    <CheckBox
                                        title={`Open for Bidding`}
                                        checked={saleType === ESaleType.BIDDING}
                                        onPress={() => setSaleType(ESaleType.BIDDING)}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        containerStyle={{ backgroundColor: 'transparent', padding: 0 }}
                                        textStyle={{ fontSize: 18, color: '#707070' }}
                                    />
                                    <CheckBox
                                        title={`Fixed Selling Price`}
                                        checked={saleType === ESaleType.FIXED_PRICE}
                                        onPress={() => setSaleType(ESaleType.FIXED_PRICE)}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        containerStyle={{ backgroundColor: 'transparent', padding: 0, marginTop: 20 }}
                                        textStyle={{ fontSize: 18, color: '#707070' }}
                                    />
                                    <Input
                                        containerStyle={{
                                            marginTop: 20,
                                            marginHorizontal: 0,
                                            paddingHorizontal: 10
                                        }}
                                        value={sellingPrice}
                                        onChangeText={(value) => setSellingPrice(value)}
                                        label={saleType === ESaleType.FIXED_PRICE ? "Selling Amount" : "Minumum Bid Price"}
                                        placeholder='Amount in Rs'
                                        labelStyle={{ color: '#707070', fontSize: 18 }}
                                        inputStyle={{
                                            fontSize: 22,
                                            paddingTop: 12,
                                            color: '#555',
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                        height: 1,
                                        width: '100%',
                                        borderColor: '#ddd',
                                        borderWidth: 1,
                                    }} />
                                <View
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingTop: 10,
                                    }}>
                                    <Text
                                        style={{
                                            marginTop: 10,
                                            fontSize: 14,
                                            lineHeight: 20,
                                            color: '#707070',
                                            paddingHorizontal: 10,
                                        }}>
                                        Enter maximum number of orders that can be placed on this item.
                                    </Text>
                                    <Input
                                        containerStyle={{
                                            marginTop: 10,
                                            marginHorizontal: 0,
                                            paddingHorizontal: 10
                                        }}
                                        value={maxOrderQuantity}
                                        onChangeText={(value) => setMaxOrderQuantity(value)}
                                        label="Max Order Quantity"
                                        placeholder='Max number of orders'
                                        labelStyle={{ color: '#707070', fontSize: 18 }}
                                        inputStyle={{
                                            fontSize: 22,
                                            paddingVertical: 12,
                                            color: '#555',
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                        height: 1,
                                        width: '100%',
                                        borderColor: '#ddd',
                                        borderWidth: 1,
                                    }} />
                                <View
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingTop: 10,
                                    }}>
                                    <Text
                                        style={{
                                            marginTop: 10,
                                            fontSize: 14,
                                            lineHeight: 20,
                                            color: '#707070',
                                            paddingHorizontal: 10,
                                        }}>
                                        You can ask the buyer to handle the shipping once an order is confirmed.
                                        Or you may choose to handle shipping yourself.
                                    </Text>
                                    <CheckBox
                                        title={`I will handle shipping`}
                                        checked={handleShippingMyself}
                                        onPress={() => { setHandleShippingMyself(!handleShippingMyself) }}
                                        iconType="material-community"
                                        checkedIcon="checkbox-outline"
                                        uncheckedIcon={'checkbox-blank-outline'}
                                        containerStyle={{
                                            backgroundColor: 'transparent',
                                            padding: 0,
                                            marginTop: 10,
                                            marginBottom: 20,
                                        }}
                                        textStyle={{ fontSize: 18, color: '#707070' }}
                                    />
                                    {(handleShippingMyself) && (
                                        <>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    lineHeight: 20,
                                                    color: '#707070',
                                                    paddingHorizontal: 10,
                                                }}>
                                                How many days do you need to ship an order once it is confirmed.
                                            </Text>
                                            <CheckBox
                                                title={`Can be shipped same day`}
                                                checked={shippedImmediately}
                                                onPress={() => { setShippedImmediately(!shippedImmediately) }}
                                                iconType="material-community"
                                                checkedIcon="checkbox-outline"
                                                uncheckedIcon={'checkbox-blank-outline'}
                                                containerStyle={{
                                                    backgroundColor: 'transparent',
                                                    padding: 0,
                                                    marginTop: 10,
                                                    marginBottom: 20,
                                                }}
                                                textStyle={{ fontSize: 18, color: '#707070' }}
                                            />
                                            {!shippedImmediately && (
                                                <Input
                                                    containerStyle={{
                                                        marginHorizontal: 0,
                                                        paddingHorizontal: 10
                                                    }}
                                                    value={shippingEstimateTimeInDays}
                                                    onChangeText={(value) => setShippingEstimateTimeInDays(value)}
                                                    label="Number of Days"
                                                    placeholder='Days'
                                                    labelStyle={{ color: '#707070', fontSize: 18 }}
                                                    inputStyle={{
                                                        fontSize: 22,
                                                        paddingVertical: 12,
                                                        color: '#555',
                                                    }}
                                                />
                                            )}
                                        </>
                                    )}
                                </View>
                            </View>
                        )}
                    </View> */}

					<View
						style={{
							paddingHorizontal: 5,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between"
						}}>
						<Button
							icon={
								<Icon
									name="arrow-back"
									color={"#fff"}
									style={{ marginRight: 8 }}
								/>
							}
							buttonStyle={{
								borderRadius: 10,
								marginTop: 30,
							}}
							color={"#707070"}
							iconPosition='left'
							onPress={() => { navigation.goBack() }}>
                            Go Back
						</Button>
						<Button
							icon={
								<Icon
									name="file-upload"
									color={"#fff"}
									style={{ marginRight: 8 }}
								/>
							}
							buttonStyle={{
								borderRadius: 10,
								marginTop: 30,
							}}
							loading={submitLoader}
							color={"success"}
							iconPosition='left'
							onPress={() => uploadPost()}>
                            Upload Post
						</Button>
					</View>

				</View>
			</ScrollView>
		</View>
	)
}