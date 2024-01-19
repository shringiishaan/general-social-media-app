import { View, TextInput } from "react-native"
import React from "react"
import { Icon } from "@rneui/base"
import { editInterestSearchBarStyles } from "./EditIntersetsScreenStyles"

export function EditInterestSearchBar() {
	return (
		<View style={editInterestSearchBarStyles.searchBarContainer}>
			<TextInput
				placeholder="Search Interests"
				style={editInterestSearchBarStyles.searchInput}
			/>
			<View style={editInterestSearchBarStyles.searchIcon}>
				<Icon name="search" type="material" size={20} />
			</View>
		</View>
	)
}
