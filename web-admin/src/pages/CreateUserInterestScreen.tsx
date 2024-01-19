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
import { EUserGender, IUser, IUserInterest, IUserInterestCategory } from "../utils/interfaces"
import { APIService } from "../utils/api.service"
import moment from "moment"
import Box from "@mui/material/Box"

type Props = {
    closeForm: (updated: boolean) => void
}

export const CreateUserInterestScreen = ({closeForm}: Props) => {

	const [interestName, setInterestName] = React.useState<string>("Interest1")
	const [categoryId, setCategoryId] = React.useState<number>(1)

	function createUserInterestCategoryAction() {
		if(interestName && categoryId) {
			APIService.createUserInterest(categoryId, interestName).then((interest: IUserInterest) => {
				console.log(interest)
				closeForm(true)
			}).catch((error: string) => {
				console.log(error)
			})
		}
	}

	function discardAction() {
		closeForm(false)
	}

	return (
		<Paper 
			sx={{
				p: 2,
				display: "flex",
				flexDirection: "column",
			}}>
			<Typography variant="h6" component="div" sx={{mb: 2}}>New Interest Form</Typography>
			<TextField
				type="text"
				variant="outlined"
				placeholder="Interest Name"
				label="Interest Name"
				size="small"
				sx={{mb: 2}}
				value={interestName}
				onChange={(e) => {
					setInterestName(e.target.value)
				}} />
			<TextField
				type="number"
				variant="outlined"
				placeholder="Category Id"
				label="Category Id"
				size="small"
				sx={{mb: 2}}
				value={categoryId}
				onChange={(e) => {
					setCategoryId(Number.parseInt(e.target.value))
				}} />
			<Box>
				<Button
					variant='contained'
					color='primary'
					onClick={() => {
						createUserInterestCategoryAction()
					}}>
                        Create Category
				</Button>
				<Button
					variant='contained'
					color='secondary'
					sx={{ml: 2}}
					onClick={() => {
						discardAction()
					}}>
                        Discard
				</Button>
			</Box>
		</Paper>
	)
}