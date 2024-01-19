import { ImagePickerAsset } from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { IAppLocation, IChat, IChatMessage, IIndustry, IJobRole, ILanguage, IMapPin, IUser, IUserCareer, IUserEducation, IUserInterestsCollection } from "./interfaces"
import { API, APIService } from "./api.service"

class ChatAPIServiceC {

    getChat(chatId: number): Promise<IChat> {
        return new Promise((resolve, reject) => {
            fetch(API(`/chats/getChat/${chatId}`), {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${APIService.AuthToken}`
                }
            })
            .then(response => {
                if (response.status !== 200) reject()
                else return response.json()
            })
            .then(response => {
                if (response) resolve(response.chat)
                else reject("Failed fetching Chat")
            })
            .catch(error => {
                console.error("REST Error [/chats/getChat]")
                console.error(error)
                reject(error)
            })
        })
    }

    getMyChats(): Promise<IChat[]> {
        return new Promise((resolve, reject) => {
            console.log("loading chats/getMyChats")
            fetch(API("/chats/getMyChats"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${APIService.AuthToken}`
                },
            })
            .then(response => {
                if (response.status !== 200) reject()
                else return response.json()
            })
            .then(response => {
                if (response && response.chats) resolve(response.chats)
                else reject("Failed fetching all Chats")
            })
            .catch(error => {
                console.error("REST Error [/chats/getMyChats]")
                console.error(error)
                reject(error)
            })
        })
    }

    getOrCreateChatWithUserId(otherUserId: number): Promise<IChat> {
        return new Promise((resolve, reject) => {
            console.log("getOrCreateChatWithUserId : ", otherUserId)
            fetch(API("/chats/getOrCreateChatWithUserId"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${APIService.AuthToken}`
                },
                body: JSON.stringify({ otherUserId })
            })
            .then(response => {
                if (response.status !== 200) reject()
                else return response.json()
            })
            .then(response => {
                console.log(response.chat)
                if (response && response.chat) resolve(response.chat)
                else reject("Failed getOrCreateChatWithUserId")
            })
            .catch(error => {
                console.error("REST Error [/chats/getOrCreateChatWithUserId]")
                console.error(error)
                reject(error)
            })
        })
    }

    createNewChat(groupName: string, otherUserId: number): Promise<IChat> {
        return new Promise((resolve, reject) => {
            console.log("new chat : ", groupName, otherUserId)
            fetch(API("/chats/createNewChat"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${APIService.AuthToken}`
                },
                body: JSON.stringify({ groupName, otherUserId })
            })
            .then(response => {
                if (response.status !== 200) reject()
                else return response.json()
            })
            .then(response => {
                console.log(response.chat)
                if (response && response.chat) resolve(response.chat)
                else reject("Failed creating new Chat")
            })
            .catch(error => {
                console.error("REST Error [/chats/createNewChat]")
                console.error(error)
                reject(error)
            })
        })
    }

    createMessage(chatId: number, message: string): Promise<IChatMessage> {
        return new Promise((resolve, reject) => {
            fetch(API("/chats/createMessage"), {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${APIService.AuthToken}`
                },
                body: JSON.stringify({ chatId, message })
            })
            .then(response => {
                if (response.status !== 200) reject()
                else return response.json()
            })
            .then(response => {
                if (response) resolve(response.message)
                else reject("Failed creating Chat Message")
            })
            .catch(error => {
                console.error("REST Error [/chats/createMessage]")
                console.error(error)
                reject(error)
            })
        })
    }

    getMessagesByChat(chatId: number): Promise<IChatMessage[]> {
        return new Promise((resolve, reject) => {
            fetch(API(`/chats/getMessages/${chatId}`), {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${APIService.AuthToken}`
                }
            })
            .then(response => {
                if (response.status !== 200) reject()
                else return response.json()
            })
            .then(response => {
                if (response) resolve(response.messages)
                else reject("Failed fetching Chat Messages by Chat ID")
            })
            .catch(error => {
                console.error("REST Error [/chats/getMessages]")
                console.error(error)
                reject(error)
            })
        })
    }
}

export const ChatAPIService: ChatAPIServiceC = new ChatAPIServiceC()