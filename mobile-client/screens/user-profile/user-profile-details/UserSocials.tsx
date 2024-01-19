import * as React from "react"
import { View, Text, Image } from "react-native"
import { Icon } from "@rneui/base"
import { typography } from "../../../styles/Typography"
import { colorsLight, colorsDark } from "../../../styles/Colors"
import { borderRadius } from "../../../styles/Radius"
import { socialsStyles } from "../../../styles/profile-styles/socials"

type UserSocialsProps = { theme: string };

export function UserSocials({ theme }: UserSocialsProps) {
	const instagramDarkLogo = require("../../../assets/images/instagram-dark.png")
	const linkedinDarkLogo = require("../../../assets/images/linkedin-dark.png")
	const youtubeDarkLogo = require("../../../assets/images/youtube-dark.png")

	const linkedinLightLogo = require("../../../assets/images/linkedin-light.png")
	const instagramLightLogo = require("../../../assets/images/instagram-light.png")
	const youtubeLightLogo = require("../../../assets/images/youtube-light.png")
	return (
		<View style={socialsStyles.socialsContainer}>
			<View style={{ flex: 1, flexDirection: "row" }}>
				<View style={{ flexGrow: 1 }}>
					<View
						style={[
							theme === "light"
								? colorsLight.SurfaceContainer
								: colorsDark.SurfaceContainer,
							borderRadius.lg,
						]}
					>
						<Image
							source={theme === "light" ? linkedinDarkLogo : linkedinLightLogo}
							style={socialsStyles.Icons}
						/>
					</View>

					<View
						style={[
							theme === "light"
								? colorsLight.SurfaceContainer
								: colorsDark.SurfaceContainer,
							borderRadius.lg,
							socialsStyles.youtubeContainer,
						]}
					>
						<Image
							source={theme === "light" ? youtubeDarkLogo : youtubeLightLogo}
							style={socialsStyles.Icons}
						/>
					</View>
				</View>

				<View
					style={[
						borderRadius.lg,
						theme === "light"
							? colorsLight.SurfaceContainer
							: colorsDark.SurfaceContainer,
						socialsStyles.instagramIconContainer,
					]}
				>
					<Image
						source={theme === "light" ? instagramDarkLogo : instagramLightLogo}
						style={socialsStyles.instagramIcon}
					/>
				</View>
			</View>

			<View style={[borderRadius.lg, socialsStyles.emailAndPlusContainer]}>
				<Text
					style={[
						typography.titleMedium,
						theme === "light"
							? [colorsLight.SurfaceContainer, colorsLight.textOnSurface]
							: [colorsDark.SurfaceContainer, colorsDark.textOnSurfaceVariant],
						socialsStyles.emailText,
						borderRadius.lg,
					]}
				>
          Email
				</Text>

				<View
					style={[
						theme === "light"
							? colorsLight.SurfaceContainer
							: colorsDark.SurfaceContainer,
						borderRadius.lg,
						socialsStyles.plusIconContainer,
					]}
				>
					<View style={socialsStyles.plusIcon}>
						<Icon
							name="add"
							size={40}
							color={theme === "light" ? "#191c19" : "#c5c7c2"}
						/>
					</View>
				</View>
			</View>
		</View>
	)
}
