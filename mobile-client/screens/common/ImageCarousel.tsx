import * as React from "react"
import { Button, Icon } from "@rneui/themed"
import { ImagePickerAsset } from "expo-image-picker"
import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native"

const { width } = Dimensions.get("window")

type MyProps = {
    images: { uri: string }[]
}

export function ImageCarousel({ images }: MyProps) {
	return (
		<View style={styles.container}>
			<FlatList
				data={images}
				renderItem={({ item, index }) => {
					return (
						<View style={{ width: ITEM_LENGTH }}>
							<View style={styles.itemContent}>
								<Image source={{ uri: item.uri }} style={styles.itemImage} />
								{(item as any).title && (
									<Text style={styles.itemText} numberOfLines={1}>
										{(item as any).title}
									</Text>
								)}
							</View>
						</View>
					)
				}}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	)
}

const SPACING = 5
const ITEM_LENGTH = width * 0.8 // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 10

const styles = StyleSheet.create({
	container: {},
	itemContent: {
		marginHorizontal: 10,
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: BORDER_RADIUS,
	},
	itemText: {
		fontSize: 24,
		position: "absolute",
		bottom: SPACING * 2,
		right: SPACING * 2,
		color: "#303030",
		fontWeight: "600",
	},
	itemImage: {
		width: "100%",
		height: ITEM_LENGTH,
		borderRadius: BORDER_RADIUS,
		resizeMode: "cover",
	},
})