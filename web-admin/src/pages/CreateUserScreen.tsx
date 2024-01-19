import * as React from "react"
import Link from "@mui/material/Link"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "./Title"
import {TextField, Paper, Button} from "@mui/material"
import Typography from "@mui/material/Typography"
import { EUserGender, IUser } from "../utils/interfaces"
import { APIService } from "../utils/api.service"
import moment from "moment"
import Box from "@mui/material/Box"

type Props = {
    closeForm: (updated: boolean) => void
}

export const CreateUserScreen = ({closeForm}: Props) => {

	const [user, setUser] = React.useState<Partial<IUser>>({
		firstName: "Salman",
		lastName: "Khan",
		phoneNumber: "9898989898",
		passwordHash: "123456",
		gender: EUserGender.MALE,
		avatarImageId: 1,
		dateOfBirth: new Date(),
		createTime: new Date()
	})

	function createUserAction() {
		APIService.createUser(user).then((user: IUser) => {
			console.log(user)
			closeForm(true)
		}).catch((error: string) => {
			console.log(error)
		})
	}

	function discardUserAction() {
		closeForm(false)
	}

	return (
		<Paper 
			sx={{
				p: 2,
				display: "flex",
				flexDirection: "column",
			}}>
			<Typography variant="h6" component="div" sx={{mb: 2}}>New User Form</Typography>
			<TextField
				type="text"
				variant="outlined"
				placeholder="First Name"
				label="First Name"
				size="small"
				sx={{mb: 2}}
				value={user.firstName}
				onChange={(e) => {
					setUser({ ...user, firstName: e.target.value })
				}} />
			<TextField
				type="text"
				variant="outlined"
				placeholder="Last Name"
				label="Last Name"
				size="small"
				sx={{mb: 2}}
				value={user.lastName}
				onChange={(e) => {
					setUser({ ...user, lastName: e.target.value })
				}} />
			<TextField
				type="text"
				variant="outlined"
				placeholder="Phone Number"
				label="Phone Number"
				size="small"
				sx={{mb: 2}}
				value={user.phoneNumber}
				onChange={(e) => {
					setUser({ ...user, phoneNumber: e.target.value })
				}} />
			<TextField
				type="text"
				variant="outlined"
				placeholder="Password"
				label="Password"
				size="small"
				sx={{mb: 2}}
				value={user.passwordHash}
				onChange={(e) => {
					setUser({ ...user, passwordHash: e.target.value })
				}} />
			<Box>
				<Button
					variant='contained'
					color='primary'
					onClick={() => {
						createUserAction()
					}}>
                        Create User
				</Button>
				<Button
					variant='contained'
					color='secondary'
					sx={{ml: 2}}
					onClick={() => {
						discardUserAction()
					}}>
                        Discard
				</Button>
			</Box>
		</Paper>
	)
}