import * as React from "react"
import Link from "@mui/material/Link"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "./Title"
import Typography from "@mui/material/Typography"
import { IUser, IUserInterest, IUserInterestCategory, IUserInterestsCollection } from "../utils/interfaces"
import { APIService } from "../utils/api.service"
import moment from "moment"
import { Box, Button } from "@mui/material"
import { CreateUserInterestCategoryScreen } from "./CreateUserInterestCategoryScreen"

export const UsersInterestCategoriesScreen = () => {

	const [newCategoryForm, setNewCategoryForm] = React.useState<boolean>(false)
	const [categories, setCategories] = React.useState<IUserInterestCategory[]>()
	const [loading, setLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<string>()

	const loadCategories = () => {
		setLoading(true)
		APIService.getAllUserInterests().then((userInterests: IUserInterestsCollection[]) => {
			console.log(userInterests)
			const categories: IUserInterestCategory[] = []
			userInterests.forEach((userInterestCollection: IUserInterestsCollection) => {
				categories.push(userInterestCollection.category)
			})
			setCategories(categories)
			setLoading(false)
		}).catch((error: string) => {
			console.error(error)
			setError(error)
			setLoading(false)
		})
	}

	React.useEffect(() => {
		loadCategories()
	}, [])

	const DrawBody = () => {
		if(newCategoryForm) {
			return (
				<CreateUserInterestCategoryScreen closeForm={(updated: boolean) => {
					console.log("close form callback ", updated)
					setNewCategoryForm(false)
					if(updated) {
						loadCategories()
					}
				}} />
			)
		} 
		if(loading) {
			return <><Typography>Loading categories...</Typography></>
		}
		if(error) {
			return <Typography color="error">categories error : {error.toString()}</Typography>
		}
		if(!categories || !categories.length) {
			return <><Typography>No categories</Typography></>
		}
		return (
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell align="right"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{categories.map((category: IUserInterestCategory) => (
						<TableRow key={category.id}>
							<TableCell>{moment(category.createTime).calendar()}</TableCell>
							<TableCell>{category.id}</TableCell>
							<TableCell>{category.name}</TableCell>
							<TableCell align="right">
								<Button
									color="primary"
									variant="contained"
									size="small"
									onClick={() => {}}>
                                    Edit
								</Button>
								<Button
									color="primary"
									variant="contained"
									size="small"
									sx={{ml:2}}
									onClick={() => {
										APIService.deleteUserInterestCategory(category.id).then(() => {
											loadCategories()
										}).catch((error: string) => {
											console.log(error)
										})
									}}>
                                    Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		)
	}

	return (
		<React.Fragment>
			<Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
				<Title>User Interest Categories</Title>
				<Button
					color="primary"
					variant="contained"
					size="small"
					onClick={() => {
						loadCategories()
					}}>
                    Refresh
				</Button>
				<Button
					color="primary"
					variant="contained"
					size="small"
					onClick={() => {
						setNewCategoryForm(true)
					}}>
                    New
				</Button>
			</Box>

			{DrawBody()}

		</React.Fragment>
	)
}