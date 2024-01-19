import { View, Text, TouchableOpacity, ScrollView, FlatList, Button } from "react-native"
import React from "react"
import { Spacing } from "../../../../styles/Spacing"
import { APIService } from "../../../../services/api.service"
import { editInterestTabsSectionStyles } from "./EditIntersetsScreenStyles"
import { interestedInStyles } from "../../../../styles/profile-styles/interestedInCard"
import { IUserInterestsCollection, IUserInterest } from "../../../../services/interfaces"

type EditInterestTabsSectionProps = {
	// userInterests: IUserInterestsCollection[]
	userInterestsUpdated: (userInterests: IUserInterestsCollection[]) => void
}

export function EditInterestTabsSection({
	// userInterests,
	userInterestsUpdated

}: EditInterestTabsSectionProps) {
	const [allInterests, setAllInterests] = React.useState<IUserInterestsCollection[]>([])
	const [error, setError] = React.useState<string | null>(null)
	const [loading, setLoading] = React.useState<boolean>(true)
	const [selectedCategory, setSelectedCategory] = React.useState<IUserInterestsCollection | null>(null)
	const [selectedInterestId, setSelectedInterestId] = React.useState<number | null>(null)

	const loadAllInterests = () => {
		APIService.getAllInterestTags().then((interestCollection: IUserInterestsCollection[]) => {
			setAllInterests(interestCollection)
		}).catch((error) => {
			setError(error)
		}).finally(() => {
			setLoading(false)
		})
	}
	React.useEffect(() => {
		loadAllInterests()
		// setSelectedCategory(userInterests[0])
	}, [])

	const handleInterestClick = (interest: IUserInterest) => {
		if (interest.id === selectedInterestId) {
			setSelectedInterestId(null)
			// userInterestsUpdated() // You might want to call this here too
		} else {
			setSelectedInterestId(interest.id)
			const updatedInterests = allInterests.map(category => {
				if (category.category.id === selectedCategory?.category.id) {
					return {
						...category,
						interests: category.interests.map(int => ({
							...int,
							selected: int.id === interest.id,
						})),
					}
				}
				return category
			})
			userInterestsUpdated(updatedInterests)
		}
	}

	const renderItem = ({ item }: { item: IUserInterestsCollection }) => {
		return (
			<View>
				<TouchableOpacity
					style={editInterestTabsSectionStyles.categoryButton}
					onPress={() => setSelectedCategory(item)}
				>
					<Text>{item.category.name}</Text>
				</TouchableOpacity>
			</View>
		)
	}

	const renderInterestDetail = (interest: IUserInterest) => {
		const isSelected = interest.id === selectedInterestId
		return (
			<TouchableOpacity key={interest.id}
				onPress={() => handleInterestClick(interest)}
			>
				<Text style={editInterestTabsSectionStyles.filteredPills}
				>{interest.name}
				</Text>
			</TouchableOpacity>
		)
	}

	return (
		<View style={editInterestTabsSectionStyles.tabsContainer}>
			<View style={{ flex: 0.75 }}>
				<FlatList
					data={allInterests}
					renderItem={renderItem}
					keyExtractor={(item) => item.category.id.toString()}
				/>
			</View>

			{selectedCategory && (
				<View style={editInterestTabsSectionStyles.filteredInterestContainer}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={Spacing.py1Half}>
						<View style={interestedInStyles.pillsContainer}>
							{selectedCategory.interests.map(renderInterestDetail)}
						</View>
					</ScrollView>
				</View>
			)}
		</View>
	)
}

// const handleInterestClick = (interest: IUserIntrest) => {
//     if (interest.id === selectedInterestId) {
//         setSelectedInterestId(null)
//     } else {
//         setSelectedInterestId(interest.id)
//         // userInterestsUpdated()
//     }
// }