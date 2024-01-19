import * as React from "react"
import { View, Text, Pressable } from "react-native"
import { useState } from "react"
import { collabCardStyles } from "./UserProfileDetailsStyles"

type UserCollabCardProps = {};

export function UserCollabCard({}: UserCollabCardProps) {
	const [limeOfLines, setLimitOfLines] = useState(false)
	return (
		<View style={collabCardStyles.container}>
			<Pressable
				style={({ pressed }) => [
					collabCardStyles.pressableContainer,
					{
						transform: pressed ? [{ scale: 0.99 }] : [{ scale: 1 }],
					},
				]}
				android_ripple={{
					borderless: true,
					color: "#191c1910",
					foreground: true,
				}}
			>
				<Text style={collabCardStyles.heading}>
                    Female Comedy Creators Wanted
				</Text>

				<Text style={collabCardStyles.subheading}>
                    2-5K Followers, Branded Content
				</Text>

				<Pressable
					onPress={() => setLimitOfLines(!limeOfLines)}
					style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1.0 }]}
				>
					<Text
						style={collabCardStyles.bodyContent}
						numberOfLines={limeOfLines ? undefined : 2}
					>
                            Do you have a knack for making people laugh? Were on the lookout for
                            a female comedy content creator nearby to join forces in crafting
                            hilarious Instagram Reels. If youve got a follower range of
                            2,000-5,000, have experience with branded content, and possess a
                            quick wit with a flair for creativity, we want to collaborate with
                            you. Lets make waves in the world of comedy content together! Get in
                            touch and lets get the laughs rolling
					</Text>
				</Pressable>
			</Pressable>
		</View>
	)
}
