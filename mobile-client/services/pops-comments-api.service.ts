import { ImagePickerAsset } from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { IAppLocation, IChat, IChatMessage, IIndustry, IJobRole, ILanguage, IMapPin, IPop, IPopComment, IUser, IUserCareer, IUserEducation, IUserInterestsCollection } from "./interfaces"
import { API, APIService } from "./api.service"

class PopCommentsAPIServiceC {

    // Method to get all comments for a specific Pop
    getCommentsByPop(popId: number): Promise<IPopComment[]> {
        return new Promise((resolve, reject) => {
            fetch(API(`/comments/getByPop/${popId}`), {
                method: "GET",
                headers: this.getHeaders()
            })
            .then(response => this.handleResponse(response))
            .then(({ comments }) => resolve(comments))
            .catch(error => this.handleError(error, "getCommentsByPop", reject))
        })
    }

    // Method to create a new comment
    createComment(popId: number, commentData: { text: string; author: number }): Promise<IPopComment> {
        return new Promise((resolve, reject) => {
            fetch(API(`/comments/create/${popId}`), {
                method: "POST",
                headers: this.getHeaders(),
                body: JSON.stringify(commentData)
            })
            .then(response => this.handleResponse(response))
            .then(comment => resolve(comment))
            .catch(error => this.handleError(error, "createComment", reject))
        })
    }

    // Method to update an existing comment
    updateComment(commentId: number, updateData: { text: string }): Promise<IPopComment> {
        return new Promise((resolve, reject) => {
            fetch(API(`/comments/update/${commentId}`), {
                method: "PUT",
                headers: this.getHeaders(),
                body: JSON.stringify(updateData)
            })
            .then(response => this.handleResponse(response))
            .then(comment => resolve(comment))
            .catch(error => this.handleError(error, "updateComment", reject))
        })
    }

    // Method to delete a comment
    deleteComment(commentId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch(API(`/comments/delete/${commentId}`), {
                method: "DELETE",
                headers: this.getHeaders()
            })
            .then(response => this.handleResponse(response))
            .then(() => resolve())
            .catch(error => this.handleError(error, "deleteComment", reject))
        })
    }

    // Helper methods
    private getHeaders() {
        return {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${APIService.AuthToken}`
        }
    }

    private handleResponse(response: Response) {
        if (response.status !== 200 && response.status !== 201) throw new Error(response.statusText)
        return response.json()
    }

    private handleError(error: any, context: string, reject: (error: any) => void) {
        console.error(`REST Error [/${context}]`)
        console.error(error)
        reject(error)
    }
}

export const PopCommentsAPIService: PopCommentsAPIServiceC = new PopCommentsAPIServiceC()