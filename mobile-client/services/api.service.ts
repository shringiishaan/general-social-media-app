import { ImagePickerAsset } from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { IAppLocation, IChat, IChatMessage, IIndustry, IJobRole, ILanguage, IMapPin, IUser, IUserCareer, IUserEducation, IUserInterestsCollection } from "./interfaces"

//const API_ENDPOINT = "http://192.168.29.26:3001"
const API_ENDPOINT = "http://54.195.169.235:3001"

export function API(append: string): string {
    return `${API_ENDPOINT}${append}`
}

class APIServiceC {

    public AuthToken: string = ""

    getUser(): Promise<{ user: IUser }> {
        return new Promise((resolve, reject) => {
            fetch(API("/auth/getUser"), {
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
                if (response && response.user) {
                    resolve({ user: response.user })
                } else reject("User not found")
            }).catch(error => {
                console.error("REST Error [/auth/getUser]")
                console.error(error)
                reject(error)
            })
        })
    }

    signUp(
        firstName: string,
        lastName: string,
        phoneNumber: string,
        gender: string,
        dateOfBirth: Date,
        avatarImageId: number,
        passwordHash: string,
    ): Promise<{ user: any, token: string }> {
        return new Promise((resolve, reject) => {
            fetch(API("/auth/signUp"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phoneNumber,
                    passwordHash,
                    avatarImageId,
                    dateOfBirth: dateOfBirth.toISOString(),
                    gender: gender,
                }),
            }).then((response: Response) => {
                if (response.status === 200) {
                    return response.json()
                } else reject()
            }).then((response) => {
                resolve({
                    user: response.user,
                    token: response.token
                })
            }).catch(error => {
                console.error("REST Error [/auth/signUp]")
                console.error(error)
                reject(error)
            })
        })
    }

    signIn(phoneNumber: string, password: string): Promise<{ user?: IUser, token?: string }> {
        return new Promise((resolve, reject) => {
            fetch(API("/auth/signIn"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: phoneNumber,
                    password
                }),
            }).then((response: Response) => {
                if (response.status !== 200) reject()
                else return response.json()
            }).then((response) => {
                if (response && response.token && response.user) {
                    this.AuthToken = response.token
                    resolve({
                        user: response.user,
                        token: response.token
                    })
                } else {
                    resolve({})
                }
            }).catch(error => {
                console.error("REST Error [/auth/signIn]")
                console.error(error)
                reject(error)
            })
        })
    }

    getAllUsersList(): Promise<IUser[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/users/getAllUsersList"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ }),
            }).then((response: any) => {
                if (response.status !== 200) reject()
                else return response.json()
            }).then(({ users }) => {
                resolve(users)
            }).catch(error => {
                console.error("REST Error [/users/getAllUsersList]")
                console.error(error)
                reject(error)
            })
        })
    }

    updateUserFirstName(firstName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch(API("/users/updateUserFirstName"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName }),
            }).then((response: Response) => {
                if (response.status !== 200) reject()
                else resolve()
            }).catch(error => {
                console.error("REST Error [/users/updateUserFirstName]")
                console.error(error)
                reject(error)
            })
        })
    }

    updateUserLastName(lastName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log("this.AuthToken: ", this.AuthToken)
            fetch(API("/users/updateUserLastName"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lastName }),
            }).then((response: any) => {
                if (response.status !== 201) reject()
                else resolve(response.users)
            }).catch(error => {
                console.error("REST Error [/users/updateUserLastName]")
                console.error(error)
                reject(error)
            })
        })
    }

    checkPhoneNumberExists(phoneNumber: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(API("/auth/checkPhoneNumberExists"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phoneNumber
                }),
            }).then(r => r.json()).then((response: any) => {
                resolve(response.exists)
            }).catch(error => {
                console.error("REST Error [/auth/checkPhoneNumberExists]")
                console.error(error)
                reject(error)
            })
        })
    }

    getUserByUserId(userId: number): Promise<IUser> {
        return new Promise((resolve, reject) => {
            fetch(API("/users/getUserByUserId"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.AuthToken}`
                },
                body: JSON.stringify({ userId }),
            }).then(r => r.json()).then((response: any) => {
                resolve(response.user)
            }).catch(error => {
                console.error("REST Error [/users/getUserByUserId]")
                console.error(error)
                reject(error)
            })
        })
    }

    getMyPosts(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/products/getMy"), {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.AuthToken}`
                },
            }).then(r => r.json()).then((response: any) => {
                resolve(response.products)
            }).catch(error => {
                console.error("REST Error [/products/getMy]")
                console.error(error)
                reject(error)
            })
        })
    }

    getImageBase64(imageId: number): Promise<{ imageBase64: any }> {
        return new Promise((resolve, reject) => {
            fetch(API(`/images/${imageId}`), {
                method: "GET",
                headers: {
                    "Accept": "blob",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.AuthToken}`
                },
            }).then((response: Response) => {
                return response.blob()
            }).then((imageBlob: Blob) => {
                const fileReaderInstance = new FileReader()
                fileReaderInstance.readAsDataURL(imageBlob)
                fileReaderInstance.onload = () => {
                    resolve({ imageBase64: fileReaderInstance.result })
                }
            }).catch(error => {
                console.error(`REST Error [/images/${imageId}]`)
                console.error(error)
                reject(error)
            })
        })
    }

    checkUserIdExists(userId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(API("/auth/checkUserIdExists"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId
                }),
            }).then(r => r.json()).then((response: any) => {
                resolve(response.exists)
            }).catch(error => {
                console.error("REST Error [/auth/checkUserIdExists]")
                console.error(error)
                reject(error)
            })
        })
    }


    /**
     * USERS
     */
    setUserAvatarImage(image: ImagePickerAsset): Promise<{ profileImageId: number }> {
        return new Promise((resolve, reject) => {
            FileSystem.uploadAsync(API("/users/setUserAvatarImage"), image.uri, {
                fieldName: "avatarImg",
                httpMethod: "POST",
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                headers: {
                    "Authorization": `Bearer ${this.AuthToken}`
                },
            }).then((response: FileSystem.FileSystemUploadResult) => {
                if (response.status === 201) {
                    resolve({ profileImageId: Number.parseInt(response.body) })
                } else {
                    console.error(response)
                    reject("Failed to upload profile image")
                }
            }).catch(error => {
                console.error("REST Error [/users/setUserAvatarImage]")
                console.error(error)
                reject(error)
            })
        })
    }

    getUserIdSuggestions(name: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/users/getUserIdSuggestions"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.AuthToken}`,
                },
                body: JSON.stringify({ name: name }),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.error(response)
                        reject("Failed to get user ID suggestions")
                    }
                })
                .then((suggestions: string[]) => {
                    resolve(suggestions)
                })
                .catch(error => {
                    console.error("REST Error [/users/getUserIdSuggestions]")
                    console.error(error)
                    reject(error)
                })
        })
    }


    /**
     * USER LANGUAGES [/userLanguages]
     */

    getAllLanguages(): Promise<ILanguage[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/userLanguages/getAllLanguages"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
            })
                .then((response: Response) => {
                    if (response.status !== 200) reject()
                    else return response.json()
                })
                .then(({ languages }) => resolve(languages))
                .catch(error => {
                    console.error("REST Error [/userLanguages/getAllLanguages]")
                    console.error(error)
                    reject(error)
                })
        })
    }

    getAllLanguagesByUserId(): Promise<ILanguage[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/userLanguages/getAllLanguagesByUserId"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
            })
                .then((response: Response) => {
                    if (response.status !== 200) reject()
                    else return response.json()
                })
                .then(({ languages }) => resolve(languages))
                .catch(error => {
                    console.error("REST Error [/userLanguages/getAllLanguagesByUserId]")
                    console.error(error)
                    reject(error)
                })
        })
    }

    updateUserAllLanguageMaps(languageIds: number[]): Promise<ILanguage[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/userLanguages/updateUserAllLanguageMaps"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ languageIds }),
            })
                .then((response: Response) => {
                    if (response.status !== 200) reject()
                    else return response.json()
                })
                .then(({ updatedUserLanguages }) => resolve(updatedUserLanguages))
                .catch(error => {
                    console.error("REST Error [/userLanguages/updateUserAllLanguageMaps]")
                    console.error(error)
                    reject(error)
                })
        })
    }

    /**
     * INTEREST TAGS [/interestTags]
     */

    getMyUserInterests(): Promise<IUserInterestsCollection[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/interestTags/getMy"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.AuthToken}`
                },
            }).then((response: Response) => {
                if (response.status !== 200) {
                    reject(new Error(`API request failed with status ${response.status}`))
                } else return response.json()
            }).then((response) => {
                if (response) {
                    resolve(response)
                } else reject("Failed fetching Interests")
            }).catch(error => {
                console.error("REST Error [/interestTags/getMy]")
                console.error(error)
                reject(error)
            })
        })
    }

    getAllInterestTags(): Promise<IUserInterestsCollection[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/interestTags/getAll"), {
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
                if (response) {
                    resolve(response)
                } else reject("Failed fetching Interests")
            }).catch(error => {
                console.error("REST Error [/interestTags/getAll]")
                console.error(error)
                reject(error)
            })
        })
    }

    updateUserInterestTags(interestCollections: IUserInterestsCollection[]): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch(API("/interestTags/update"), {
                method: "POST",
                body: JSON.stringify(interestCollections),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.AuthToken}`
                },
            }).then((response: Response) => {
                if (response.status !== 200) reject()
                else resolve()
            }).catch(error => {
                console.error("REST Error [/interestTags/update]")
                console.error(error)
                reject(error)
            })
        })
    }

    /**
     * USER EDUCATION [/educations]
     */

    getMyEducations(): Promise<{ myEducations: IUserEducation[] }> {
        return new Promise((resolve, reject) => {
            fetch(API("/educations/getMyEducations"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => {
                    console.error("REST Error [/educations/getMyEducations]")
                    reject(error)
                })
        })
    }

    createMyEducations(myEducations: IUserEducation[]): Promise<{ myEducations: IUserEducation[] }> {
        return new Promise((resolve, reject) => {
            fetch(API("/educations/createMyEducations"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(myEducations),
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => {
                    console.error("REST Error [/educations/createMyEducations]")
                    reject(error)
                })
        })
    }

    updateMyEducations(myEducations: IUserEducation[]): Promise<{ myEducations: IUserEducation[] }> {
        return new Promise((resolve, reject) => {
            fetch(API("/educations/updateMyEducations"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(myEducations),
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => {
                    console.error("REST Error [/educations/updateMyEducations]")
                    reject(error)
                })
        })
    }

    deleteMyEducation(myEducationId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(API("/educations/deleteMyEducation"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ myEducationId }),
            })
                .then(response => response.json())
                .then(data => resolve(data.success))
                .catch(error => {
                    console.error("REST Error [/educations/deleteMyEducation]")
                    reject(error)
                }
                )
        }
        )
    }

    /**
     * INDUSTRIES [/industries]
     */

    getAllIndustries(): Promise<IIndustry[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/userCareer/getAllIndustries"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
            }).then(response => response.json()).then(data => {
                resolve(data.industries)
            }).catch(error => {
                console.error("REST Error [/userCareer/getAllIndustries]")
                console.error(error)
                reject(error)
            })
        })
    }

    /**
     * JOB ROLES [/jobroles]
     */

    getAllJobRoles(): Promise<IJobRole[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/userCareer/getAllJobRoles"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
            }).then(response => response.json()).then(data => {
                resolve(data.jobRoles)
            }).catch(error => {
                console.error("REST Error [/userCareer/getAllJobRoles]")
                console.error(error)
                reject(error)
            })
        })
    }

    /**
     * USER CAREER [/userCareer]
     */

    getAllUserCareersByUserId(): Promise<IUserCareer[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/userCareer/getMyCareers"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
            }).then(response => response.json()).then(data => {
                resolve(data.myCareers)
            }).catch(error => {
                console.error("REST Error [/userCareer/getMyCareers]")
                console.error(error)
                reject(error)
            })
        })
    }

    createMyCareers(careers: { industryId: number, jobRoleId: number, priority: number, year: number }[]): Promise<IUserCareer[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/userCareer/createMyCareers"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(careers),
            }).then(response => response.json()).then(data => {
                resolve(data.myCareers)
            }).catch(error => {
                console.error("REST Error [/userCareer/createMyCareers]")
                console.error(error)
                reject(error)
            })
        })
    }

    updateMyCareers(careers: { industryId: number, jobRoleId: number, priority: number, year: number }[]): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(API("/userCareer/updateMyCareers"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(careers),
            }).then(response => response.json()).then(data => {
                resolve(data.success)
            }).catch(error => {
                console.error("REST Error [/userCareer/updateMyCareers]")
                console.error(error)
                reject(error)
            })
        })
    }

    deleteMyCareers(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(API("/userCareer/deleteMyCareers"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
            }).then(response => response.json()).then(data => {
                resolve(data.success)
            }).catch(error => {
                console.error("REST Error [/userCareer/deleteMyCareers]")
                console.error(error)
                reject(error)
            })
        })
    }

    deleteMyCareerById(careerId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(API("/userCareer/deleteMyCareerById"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ careerId }),
            })
                .then(response => response.json())
                .then(data => resolve(data.success))
                .catch(error => {
                    console.error("REST Error [/userCareer/deleteMyCareerById]")
                    reject(error)
                }
                )
        }
        )
    }

    /**
     * MAP PINS [/mapPins]
     */

    getAllMapPins(): Promise<{ allMapPins: IMapPin[], myMapPins: IMapPin[] }> {
        return new Promise((resolve, reject) => {
            fetch(API("/mapPins/getAllMapPins"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
            }).then(response => response.json()).then(data => {
                resolve(data)
            }).catch(error => {
                console.error("REST Error [/mapPins/getAllMapPins]")
                console.error(error)
                reject(error)
            })
        })
    }

    getMapPinById(mapPinId: number): Promise<IMapPin> {
        return new Promise((resolve, reject) => {
            fetch(API("/mapPins/getMapPinById"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mapPinId }),
            })
                .then(response => response.json())
                .then(data => resolve(data.mapPin))
                .catch(error => {
                    console.error("REST Error [/mapPins/getMapPinById]")
                    console.error(error)
                    reject(error)
                })
        })
    }

    getAllUsersByMapPinId(mapPinId: number): Promise<IUser[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/mapPins/getAllUsersByMapPinId"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mapPinId }),
            })
                .then(response => response.json())
                .then(data => resolve(data.users))
                .catch(error => {
                    console.error("REST Error [/mapPins/getAllUsersByMapPinId]")
                    console.error(error)
                    reject(error)
                })
        })
    }

    getMapPinsByLocationArea(
        minLat: number,
        maxLat: number,
        minLng: number,
        maxLng: number,
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(API("/mapPins/getMapPinsByLocationArea"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    minLat, minLng, maxLat, maxLng
                }),
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => {
                    console.error("REST Error [/mapPins/getMapPinsByLocationArea]")
                    console.error(error)
                    reject(error)
                })
        })
    }

    createPinAndJoin(appLocation: IAppLocation): Promise<IMapPin> {
        return new Promise((resolve, reject) => {
            fetch(API("/mapPins/createPinAndJoin"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appLocation),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    resolve(data.mapPin)
                })
                .catch(error => {
                    console.error("REST Error [/mapPins/createPinAndJoin]")
                    console.error(error)
                    reject(error)
                })
        })
    }

    joinPin(mapPinId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(API("/mapPins/joinPin"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mapPinId
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    resolve(data.success)
                })
                .catch(error => {
                    console.error("REST Error [/mapPins/joinPin]")
                    console.error(error)
                    reject(error)
                })
        })
    }

    leavePin(mapPinId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(API("/mapPins/leavePin"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mapPinId
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    resolve(data.success)
                })
                .catch(error => {
                    console.error("REST Error [/mapPins/leavePin]")
                    console.error(error)
                    reject(error)
                })
        })
    }

    /**
     * APP LOCATIONS [/appLocations]
     */

    getAllAppLocations(): Promise<IAppLocation[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/appLocations/getAll"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.AuthToken,
                    "Content-Type": "application/json",
                },
            }).then(response => response.json()).then(data => {
                console.log(data)
                resolve(data)
            }).catch(error => {
                console.error("REST Error [/appLocations/getAll]")
                console.error(error)
                reject(error)
            })
        })
    }
}

export const APIService: APIServiceC = new APIServiceC()



const mockInterestsData: any[] = [
    {
        category: {
            id: 1,
            name: "Music"
        },
        interests: [
            {
                id: 101,
                name: "Blues",
                categoryId: 1,
                createTime: new Date("2023-01-15T10:20:30Z")
            },
            {
                id: 102,
                name: "Jazz",
                categoryId: 1,
                createTime: new Date("2023-01-16T10:20:30Z")
            },
            {
                id: 103,
                name: "Rock",
                categoryId: 1,
                createTime: new Date("2023-01-17T10:20:30Z")
            }
        ]
    },
    {
        category: {
            id: 2,
            name: "Movies"
        },
        interests: [
            {
                id: 201,
                name: "Action",
                categoryId: 2,
                createTime: new Date("2023-01-18T10:20:30Z")
            },
            {
                id: 202,
                name: "Romance",
                categoryId: 2,
                createTime: new Date("2023-01-19T10:20:30Z")
            }
        ]
    },
    {
        category: {
            id: 3,
            name: "Books"
        },
        interests: [
            {
                id: 301,
                name: "Mystery",
                categoryId: 3,
                createTime: new Date("2023-01-20T10:20:30Z")
            },
            {
                id: 302,
                name: "Fantasy",
                categoryId: 3,
                createTime: new Date("2023-01-21T10:20:30Z")
            }
        ]
    }
]

export default mockInterestsData