export interface IUser {
    id: number
    firstName: string
    lastName: string
    phoneNumber: string
    passwordHash: string
    gender: EUserGender
    dateOfBirth: Date
    avatarImageId: number
    createTime: Date
}

export interface IUserInterestsCollection {
    category: IUserInterestCategory
    interests: IUserInterest[]
}

export interface IUserInterest {
    id: number
    name: string
    categoryId: number
    createTime: Date
}

export interface IUserInterestCategory {
    id: number
    name: string
    createTime: Date
}

export enum EUserGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    NON_BINARY = "NON_BINARY",
}