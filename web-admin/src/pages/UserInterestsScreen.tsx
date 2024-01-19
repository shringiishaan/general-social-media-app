import * as React from "react"
import Link from "@mui/material/Link"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "./Title"
import Typography from "@mui/material/Typography"
import { IUser, IUserInterest, IUserInterestsCollection } from "../utils/interfaces"
import { APIService } from "../utils/api.service"
import moment from "moment"
import { CreateUserInterestScreen } from "./CreateUserInterestScreen"
import { Box, Button } from "@mui/material"

export const UsersInterestsScreen = () => {

	const [newInterestForm, setNewInterestForm] = React.useState<boolean>(false)
	const [userInterests, setUserInterests] = React.useState<IUserInterest[]>()
	const [loading, setLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<string>()

	const loadUserInterests = () => {
		setLoading(true)
		APIService.getAllUserInterests().then((collection: IUserInterestsCollection[]) => {
			console.log(collection)
			const userInterests: IUserInterest[] = []
			collection.forEach((userInterestCollection: IUserInterestsCollection) => {
				userInterestCollection.interests.forEach((userInterest: IUserInterest) => {
					userInterests.push(userInterest)
				})
			})
			console.log("got list ", userInterests)
			setUserInterests(userInterests)
			setLoading(false)
		}).catch((error: string) => {
			console.error(error)
			setError(error)
			setLoading(false)
		})
	}

	React.useEffect(() => {
		loadUserInterests()
	}, [])

	const DrawBody = () => {
		if(newInterestForm) {
			return (
				<CreateUserInterestScreen closeForm={(updated: boolean) => {
					setNewInterestForm(false)
					if(updated) {
						loadUserInterests()
					}
				}} />
			)
		} 
		if(loading) {
			return <><Typography>Loading User Interests...</Typography></>
		}
		if(error) {
			return <Typography color="error">User Interests error : {error.toString()}</Typography>
		}
		if(!userInterests || !userInterests.length) {
			return <><Typography>No userInterests</Typography></>
		}
		return (
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Id</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Category Id</TableCell>
						<TableCell align="right"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{userInterests.map((userInterest: IUserInterest) => (
						<TableRow key={userInterest.id}>
							<TableCell>{moment(userInterest.createTime).calendar()}</TableCell>
							<TableCell>{userInterest.id}</TableCell>
							<TableCell>{userInterest.name}</TableCell>
							<TableCell>{userInterest.categoryId}</TableCell>
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
            
				<Title>User Interests</Title>
				<Button
					color="primary"
					variant="contained"
					size="small"
					onClick={() => {
						loadUserInterests()
					}}>
                Refresh
				</Button>
				<Button
					color="primary"
					variant="contained"
					size="small"
					onClick={() => {
						setNewInterestForm(true)
					}}>
                New
				</Button>
			</Box>

			{DrawBody()}

		</React.Fragment>
	)
}