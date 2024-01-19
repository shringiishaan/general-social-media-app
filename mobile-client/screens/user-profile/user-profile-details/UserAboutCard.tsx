import * as React from "react"
import { View, Text } from "react-native"
import { typography } from "../../../styles/Typography"
import { colorsDark, colorsLight } from "../../../styles/Colors"
import { borderRadius } from "../../../styles/Radius"
import { AboutStyles } from "../../../styles/profile-styles/aboutCard"
import { Spacing } from "../../../styles/Spacing"

type UserAboutCardProps = { theme: string };

const aboutMePoints: string[] = [
	"I make scripts sale-worthy.",
	"Packaging and positioning specialist.",
	"Managed by Collective Artist Network.",
	"9 Years of experience as Copywriter, Screenwriter, Director.",
]

const platforms: string[] = [
	"script reports",
	"ip creation",
	"promotional material",
	"screenwriting services",
]

export function UserAboutCard({ theme }: UserAboutCardProps) {
	return (
		<View
			style={[
				theme === "light"
					? colorsLight.SurfaceContainerHigh
					: colorsDark.SurfaceContainerHigh,
				borderRadius.xl,
				AboutStyles.container,
			]}
		>
			<Text
				style={[
					typography.titleMedium,
					theme === "light"
						? colorsLight.textOnSurface
						: colorsDark.textOnSurface,
					AboutStyles.headingTextMargin,
				]}
			>
        About me
			</Text>

			<View style={AboutStyles.subHeadingPadding}>
				{aboutMePoints.map((aboutMePoint, index) => {
					return (
						<Text
							key={index}
							style={[
								theme === "light"
									? colorsLight.textOnSurface
									: colorsDark.textOnSurface,
								typography.bodySmall,
							]}
						>
							{aboutMePoint}
						</Text>
					)
				})}
			</View>

			<View style={[Spacing.pt2, Spacing.px1]}>
				<Text
					style={[
						theme === "light"
							? colorsLight.textOnSurface
							: colorsDark.textOnSurface,
						typography.bodySmall,
					]}
				>
          I provide a variety of solutions to storytelling problems across
          platforms:
				</Text>

				<View style={AboutStyles.pillsContainer}>
					{platforms.map((platform, index) => (
						<Text
							key={index}
							style={[
								theme === "light"
									? [colorsLight.textBackground, colorsLight.OnBackground]
									: [colorsDark.textBackground, colorsDark.OnBackground],
								typography.labelSmall,
								AboutStyles.pills,
							]}
						>
							{platform}
						</Text>
					))}
				</View>
			</View>
		</View>
	)
}
