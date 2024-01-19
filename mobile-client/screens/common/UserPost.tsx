import * as React from "react"
import {
	TouchableOpacity,
	Pressable,
	View,
	Image,
	StatusBar,
	StyleSheet,
} from "react-native"
import { ScreenHeight, Text } from "@rneui/base"
import * as FIcon from "react-native-vector-icons/FontAwesome"
import * as F2Icon from "react-native-vector-icons/Feather"
import * as IIcon from "react-native-vector-icons/Ionicons"

type UserPostProps = {
  post: any;
};
const userDefaultProfileImg = require("../../assets/images/demo-image.jpg")

export const UserPost = ({ post }: UserPostProps) => {
	return (
		<View style={[styles.postBox]}>
			<View style={[styles.postHeader]}>
				<Image
					style={[styles.postHeaderImage]}
					source={userDefaultProfileImg}
				/>
				<View style={styles.postHeaderUsernameContainer}>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "flex-start",
						}}
					>
						<Text
							style={{
								fontWeight: "500",
								color: "#444",
								fontSize: 16,
								lineHeight: 16,
							}}
						>
							{post.name}
						</Text>
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "flex-start",
						}}
					>
						<FIcon.default
							name="user"
							size={12}
							color="#707070"
							style={{
								color: "#707070",
							}}
						/>
						<Text
							style={{
								marginLeft: 4,
								marginTop: 2,
								fontSize: 12,
								lineHeight: 12,
								color: "#707070",
							}}
						>
							{post.owner.firstName} {post.owner.lastName}
						</Text>
					</View>
				</View>
				<View style={styles.postHeaderActionContainer}>
					<Pressable
						android_ripple={{
							color: "#707070",
							borderless: false,
							foreground: true,
							radius: 16,
						}}
						style={{
							minWidth: 40,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<F2Icon.default name="more-vertical" size={18} color="#333" />
					</Pressable>
				</View>
			</View>

			<View style={[styles.postImageContainer]}>
			</View>

			<View style={[styles.postFooterContainer]}>
				<View style={[styles.postFooterActionContainer]}>
					<View style={[styles.postFooterActionLeftBox]}>
						<TouchableOpacity
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-start",
							}}
						>
							<FIcon.default
								name="heart-o"
								size={24}
								color="#444"
								style={{ marginRight: 12 }}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-start",
							}}
						>
							<FIcon.default
								name="comment-o"
								size={25}
								color="#444"
								style={{ marginTop: -3 }}
							/>
						</TouchableOpacity>
					</View>
					<View style={[styles.postFooterActionRightBox]}>
						<TouchableOpacity>
							<FIcon.default
								name="share-square-o"
								size={25}
								color="#444"
								style={{}}
							/>
						</TouchableOpacity>
					</View>
				</View>
				{[1, 2].map((v) => (
					<Text style={[styles.postCommentText]} numberOfLines={0} key={v}>
						<Text style={[styles.postCommentUsername]}>someusername&nbsp;</Text>
            As padding is used to implement the behavior of the component,
            padding rules in styles applied
					</Text>
				))}
				<TouchableOpacity>
					<Text numberOfLines={1} style={{ marginTop: 2 }}>
            View all 12 comments
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export const UserPostSimple = ({ post }: UserPostProps) => {
	return (
		<View
			style={{
				marginBottom: 20,
				alignSelf: "stretch",
				paddingHorizontal: 10,
				paddingVertical: 0,
			}}
		>
			<Text
				style={{
					fontSize: 16,
					lineHeight: 18,
					fontWeight: "bold",
					paddingHorizontal: 10,
					marginBottom: 4,
				}}
			>
				{post.name}
			</Text>
			<Text
				style={{
					fontSize: 14,
					lineHeight: 16,
					fontWeight: "300",
					paddingHorizontal: 10,
					marginBottom: 4,
				}}
			>
        By {post.owner.firstName}
			</Text>
			<View
				style={{
					borderRadius: 4,
					overflow: "hidden",
					padding: 0,
				}}
			>
			</View>
		</View>
	)
}

const StoryBoxWidth: number = 84
const StoryCircleSize: number = 60
const StoryCircleUnseenOffset: number = 8

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		alignItems: "stretch",
		justifyContent: "flex-start",
		backgroundColor: "#eee",
	},
	storiesBar: {
		flex: 0,
		flexGrow: 0,
		flexShrink: 1,
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: "#eee",
	},
	storiesBarContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	storyBox: {
		flex: 1,
		alignItems: "center",
		minWidth: StoryBoxWidth,
		maxWidth: StoryBoxWidth,
	},
	storyCircle: {
		height: StoryCircleSize,
		width: StoryCircleSize,
		borderRadius: StoryCircleSize,
		overflow: "hidden",
		elevation: 4,
	},
	storyCircleUnseen: {
		height: StoryCircleSize + StoryCircleUnseenOffset,
		width: StoryCircleSize + StoryCircleUnseenOffset,
		borderRadius: StoryCircleSize + StoryCircleUnseenOffset,
		borderWidth: 2,
		borderColor: "blue",
		alignItems: "center",
		justifyContent: "center",
	},
	storyCircleUnseenInvisible: {
		height: StoryCircleSize + StoryCircleUnseenOffset,
		width: StoryCircleSize + StoryCircleUnseenOffset,
		borderRadius: StoryCircleSize + StoryCircleUnseenOffset,
		borderWidth: 4,
		borderColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	storyImage: {
		resizeMode: "stretch",
		height: StoryCircleSize,
		width: StoryCircleSize,
	},
	storyText: {
		marginTop: 8,
	},

	mainContent: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
	},
	mainContentContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
	},
	postBox: {
		flex: 1,
		flexDirection: "column",
		alignItems: "stretch",
		justifyContent: "flex-start",
		paddingBottom: 30,
		backgroundColor: "pink",
		borderRadius: 15,
		marginVertical: 16,
		overflow: "hidden",
	},
	postHeader: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "stretch",
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: "olive",
	},
	postHeaderImage: {
		height: 40,
		width: 40,
		borderRadius: 40,
		resizeMode: "cover",
	},
	postHeaderUsernameContainer: {
		paddingLeft: 10,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
	},
	postHeaderActionContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "stretch",
		justifyContent: "flex-end",
	},
	postImageContainer: {
		flex: 1,
		backgroundColor: "blue",
		maxHeight: ScreenHeight * 0.6,
	},
	postImage: {
		flex: 1,
		resizeMode: "cover",
		maxHeight: ScreenHeight * 0.6,
	},

	postFooterContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		paddingHorizontal: 10,
		paddingTop: 4,
		backgroundColor: "lime",
	},
	postCommentContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	postCommentText: {
		marginBottom: 2,
	},
	postCommentUsername: {
		fontWeight: "bold",
		marginRight: 4,
	},

	postFooterActionContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 6,
		paddingBottom: 10,
		paddingLeft: 6,
		paddingRight: 8,
	},
	postFooterActionLeftBox: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	postFooterActionRightBox: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},
})
