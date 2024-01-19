import { ImagePickerAsset } from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { IAppLocation, IChat, IChatMessage, IIndustry, IJobRole, ILanguage, IMapPin, IPop, IUser, IUserCareer, IUserEducation, IUserInterestsCollection } from "./interfaces"
import { API, APIService } from "./api.service"

class PopsAPIServiceC {

    // Method to get a single Pop by ID
    getPop(popId: number): Promise<IPop> {
        return new Promise((resolve, reject) => {
            fetch(API(`/pops/getPop/${popId}`), {
                method: "GET",
                headers: this.getHeaders()
            })
            .then(response => this.handleResponse(response))
            .then(({pop}) => resolve(pop))
            .catch(error => this.handleError(error, "getPop", reject))
        })
    }

    // Method to get all Pops
    getAllPops(): Promise<IPop[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/pops/getAllPops"), {
                method: "GET",
                headers: this.getHeaders()
            })
            .then(response => this.handleResponse(response))
            .then(({pops}) => resolve(pops))
            .catch(error => this.handleError(error, "getAllPops", reject))
        })
    }

    // Method to create a new Pop
    createPop(newPopData: any): Promise<IPop> { // Replace 'any' with a proper type or interface
        return new Promise((resolve, reject) => {
            fetch(API("/pops/createPop"), {
                method: "POST",
                headers: this.getHeaders(),
                body: JSON.stringify(newPopData)
            })
            .then(response => this.handleResponse(response))
            .then(pop => resolve(pop))
            .catch(error => this.handleError(error, "createPop", reject))
        })
    }

    // Method to update an existing Pop
    updatePop(popId: number, updateData: any): Promise<IPop> { // Replace 'any' with a proper type or interface
        return new Promise((resolve, reject) => {
            fetch(API(`/pops/updatePop/${popId}`), {
                method: "PUT",
                headers: this.getHeaders(),
                body: JSON.stringify(updateData)
            })
            .then(response => this.handleResponse(response))
            .then(pop => resolve(pop))
            .catch(error => this.handleError(error, "updatePop", reject))
        })
    }

    // Method to delete a Pop
    deletePop(popId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch(API(`/pops/deletePop/${popId}`), {
                method: "DELETE",
                headers: this.getHeaders()
            })
            .then(response => this.handleResponse(response))
            .then(() => resolve())
            .catch(error => this.handleError(error, "deletePop", reject))
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

export const PopsAPIService: PopsAPIServiceC = new PopsAPIServiceC()