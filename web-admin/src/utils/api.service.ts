import { IUser, IUserInterest, IUserInterestCategory, IUserInterestsCollection } from "./interfaces"

// const API_ENDPOINT = "http://54.195.169.235:3001"
const API_ENDPOINT = "http://localhost:3001"
// const API_ENDPOINT = "http://192.168.29.249:3001"
// const API_ENDPOINT: string = `https://fassix-server-svifh.ondigitalocean.app/`

function API(append: string): string {
	return `${API_ENDPOINT}${append}`
}

class APIServiceC {

	AuthToken: string = ""

	getAllUsers(): Promise<IUser[]> {
		return new Promise((resolve, reject) => {
			fetch(API("/users/adminGetAll"), {
				method: "GET",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.AuthToken}`
				},
			}).then((response: Response) => {
				if (response.status !== 200) reject()
				else return response.json()
			}).then((response) => {
				if (response && response.users) {
					resolve(response.users)
				} else reject("Users not found")
			}).catch(error => {
				console.error("REST Error [/users/adminGetAll]")
				console.error(error)
				reject(error)
			})
		})
	}

	createUser(user: Partial<IUser>): Promise<IUser> {
		return new Promise((resolve, reject) => {
			fetch(API("/users/adminCreateUser"), {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.AuthToken}`
				},
				body: JSON.stringify(user),
			}).then((response: Response) => {
				console.log("response: ", response)
				if (response.status !== 201) reject()
				else return response.json()
			}).then((response) => {
				if (response) {
					resolve(response)
				} else reject("Create User Failed")
			}).catch(error => {
				console.error("REST Error [/users/adminCreateUser]")
				console.error(error)
				reject(error)
			})
		})
	}

	deleteUser(userId: number): Promise<void> {
		return new Promise((resolve, reject) => {
			fetch(API("/users/adminDeleteUser"), {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.AuthToken}`
				},
				body: JSON.stringify({userId}),
			}).then((response: Response) => {
				console.log("response: ", response)
				if (response.status !== 201) reject()
				else resolve()
			}).catch(error => {
				console.error("REST Error [/users/adminDeleteUser]")
				console.error(error)
				reject(error)
			})
		})
	}


	/**
     * USER INTERESTS
     */
	getAllUserInterests(): Promise<IUserInterestsCollection[]> {
		return new Promise((resolve, reject) => {
			fetch(API("/userInterests/adminGetAll"), {
				method: "GET",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
				},
			}).then((response: Response) => {
				if (response.status !== 200) reject()
				else return response.json()
			}).then((response) => {
				if (response) {
					resolve(response)
				} else reject("User interests not found")
			}).catch(error => {
				console.error("REST Error [/userInterests/adminGetAll]")
				console.error(error)
				reject(error)
			})
		})
	}

	createUserInterest(categoryId: number, interestName: string): Promise<IUserInterest> {
		return new Promise((resolve, reject) => {
			fetch(API("/userInterests/adminCreateUserInterest"), {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.AuthToken}`
				},
				body: JSON.stringify({
					interestName, categoryId
				}),
			}).then((response: Response) => {
				if (response.status !== 201) reject()
				else return response.json()
			}).then((response: any) => {
				resolve(response)
			}).catch(error => {
				console.error("REST Error [/userInterests/adminCreateUserInterest]")
				console.error(error)
				reject(error)
			})
		})
	}

	updateUserInterest(interestId: number, interestName: string): Promise<IUserInterest> {
		return new Promise((resolve, reject) => {
			fetch(API("/userInterests/adminUpdateUserInterest"), {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.AuthToken}`
				},
				body: JSON.stringify({
					interestId, interestName
				}),
			}).then((response: Response) => {
				if (response.status !== 200) reject()
				else return response.json()
			}).then((response: any) => {
				resolve(response)
			}).catch(error => {
				console.error("REST Error [/userInterests/adminUpdateUserInterest]")
				console.error(error)
				reject(error)
			})
		})
	}

	deleteUserInterest(interestId: number): Promise<void> {
		return new Promise((resolve, reject) => {
			fetch(API("/userInterests/adminDeleteUserInterest"), {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.AuthToken}`
				},
				body: JSON.stringify({
					interestId
				}),
			}).then((response: Response) => {
				if (response.status !== 200) reject()
				else return response.json()
			}).then((response: any) => {
				resolve(response)
			}).catch(error => {
				console.error("REST Error [/userInterests/adminDeleteUserInterest]")
				console.error(error)
				reject(error)
			})
		})
	}

	createUserInterestCategory(categoryName: string): Promise<IUserInterestCategory> {
		return new Promise((resolve, reject) => {
			fetch(API("/userInterests/adminCreateUserInterestCategory"), {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.AuthToken}`
				},
				body: JSON.stringify({
					categoryName
				}),
			}).then((response: Response) => {
				console.log("response: ", response)
				if (response.status !== 201) reject()
				else return response.json()
			}).then((response: any) => {
				console.log("response: ", response)
				resolve(response)
			}).catch(error => {
				console.error("REST Error [/userInterests/adminCreateUserInterestCategory]")
				console.error(error)
				reject(error)
			})
		})
	}

	updateUserInterestCategory(categoryId: number, categoryName: string): Promise<void> {
		return new Promise((resolve, reject) => {
			fetch(API("/userInterests/adminUpdateUserInterestCategory"), {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.AuthToken}`
				},
				body: JSON.stringify({
					categoryId, categoryName
				}),
			}).then((response: Response) => {
				if (response.status !== 200) reject()
				else return response.json()
			}).then((response: any) => {
				resolve(response)
			}).catch(error => {
				console.error("REST Error [/userInterests/adminUpdateUserInterestCategory]")
				console.error(error)
				reject(error)
			})
		})
	}

	deleteUserInterestCategory(categoryId: number): Promise<void> {
		return new Promise((resolve, reject) => {
			fetch(API("/userInterests/adminDeleteUserInterestCategory"), {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.AuthToken}`
				},
				body: JSON.stringify({
					categoryId
				}),
			}).then((response: Response) => {
				if (response.status !== 201) reject()
				else resolve()
			}).catch(error => {
				console.error("REST Error [/userInterests/adminDeleteUserInterestCategory]")
				console.error(error)
				reject(error)
			})
		})
	}
}

export const APIService: APIServiceC = new APIServiceC()