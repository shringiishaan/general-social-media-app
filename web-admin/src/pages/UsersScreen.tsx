import * as React from "react"
import Link from "@mui/material/Link"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "./Title"
import Typography from "@mui/material/Typography"
import { IUser } from "../utils/interfaces"
import { APIService } from "../utils/api.service"
import moment from "moment"
import { Box, Button } from "@mui/material"
import { CreateUserScreen } from "./CreateUserScreen"

export const UsersScreen = () => {

	const [newUserForm, setNewUserForm] = React.useState<boolean>(false)
	const [users, setUsers] = React.useState<IUser[]>()
	const [loading, setLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<string>()

	const loadUsers = () => {
		setLoading(true)
		APIService.getAllUsers().then((users: IUser[]) => {
			console.log("got users", users)
			setUsers(users)
			setLoading(false)
		}).catch((error: string) => {
			console.log(error)
			setError(error)
			setLoading(false)
		})
	}

	const deleteUser = (userId: number) => {
		APIService.deleteUser(userId).then(() => {
			loadUsers()
		}).catch((error: string) => {
			console.log(error)
		})
	}

	React.useEffect(() => {
		loadUsers()
	}, [])

	const DrawBody = () => {
		if(newUserForm) {
			return (
				<CreateUserScreen closeForm={(updated: boolean) => {
					setNewUserForm(false)
					if(updated) {
						loadUsers()
					}
				}} />
			)
		} 
		if(loading) {
			return <><Typography>Loading Users...</Typography></>
		}
		if(error) {
			return <Typography color="error">Users error : {error.toString()}</Typography>
		}
		if(!users || !users.length) {
			return <><Typography>No Users</Typography></>
		}
		return (
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Phone Number</TableCell>
						<TableCell>Password</TableCell>
						<TableCell align="right"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user: IUser) => (
						<TableRow key={user.id}>
							<TableCell>{moment(user.createTime).calendar()}</TableCell>
							<TableCell>{user.firstName} {user.lastName}</TableCell>
							<TableCell>{user.phoneNumber}</TableCell>
							<TableCell>{user.passwordHash}</TableCell>
							<TableCell align="right">
								<Button
									color="primary"
									variant="contained"
									size="small"
									onClick={() => {
                                        
									}}>
                                    Edit
								</Button>
								<Button
									color="primary"
									variant="contained"
									size="small"
									sx={{ml:2}}
									onClick={() => {
										deleteUser(user.id)
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
				<Title>
                    Tap Users
				</Title>
				<Button
					color="primary"
					variant="contained"
					size="small"
					onClick={() => {
						loadUsers()
					}}>
                    Refresh
				</Button>
				<Button
					color="primary"
					variant="contained"
					size="small"
					onClick={() => {
						setNewUserForm(true)
					}}>
                    New
				</Button>
			</Box>

			{DrawBody()}

		</React.Fragment>
	)
}