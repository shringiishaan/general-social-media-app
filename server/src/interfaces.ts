import { Socket } from "socket.io"
import { User } from "./users/user.entity"
import { InterestTag } from "./interest-tags/interest-tag.entity"
import { InterestTagCategory } from "./interest-tags/interest-tag-category.entity"

export interface IUserCacheData {
    user: User
    socket: Socket
    locationLatitude: number
    locationLongitude: number
}

export interface IInterestTagsCollection {
    category: InterestTagCategory
    interests: InterestTag[]
}

export enum EUserGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    NON_BINARY = "NON_BINARY",
}

export enum EUserChatRole {
    MEMBER = "MEMBER",
    ADMIN = "ADMIN",
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