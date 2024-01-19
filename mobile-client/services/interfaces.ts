export interface IUser {
    id: number
    firstName: string
    lastName: string
    phoneNumber: string
    gender: EUserGender
    dateOfBirth: Date
    avatarImageId: number
    createTime: Date
}

export interface IUserEducation {
    id: number
    userId: number
    course?: string
    college?: string
    graduationYear?: string
    priority: number
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

export interface IUserCareer {
    id: number
    userId: number
    industryId: number
    jobRoleId: number
    year: number
    priority: number
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

export interface ILanguage {
    id: number
    name: string
    priority: number
    createTime: Date
}

export interface IIndustry {
    id: number
    name: string
    priority: number
    createTime: Date
}

export interface IJobRole {
    id: number
    name: string
    industryId: number
    priority: number
    createTime: Date
}

export interface IMapPin {
    id: number
    name: string
    usersCount: number
    latitude: number
    longitude: number
    createTime: Date
}

export interface IAppLocation {
    name: string,
    latitude: number,
    longitude: number
    /**
     * Map Pin is null if the location is not a map pin
     */
    mapPin: {
        mapPinId: number
        usersCount: number
    } | null
}

export interface IChat {
    id: number
    groupName: string
    messages: IChatMessage[]
    createTime: Date
}

export interface IChatMessage {
    id: number
    sender: IUser
    message: string
    chat: IChat
    createTime: Date
}

export interface IPop {
    id: number
    text: string
    owner: IUser
    createTime: Date
}

export interface IPopComment {
    id: number
    text: string
    pop: IPop
    author: IUser
    createTime: Date
}