import { create } from "zustand"
import { ILanguage, IUser, IUserCareer, IUserEducation, IUserInterest, IUserInterestsCollection } from "../interfaces"

interface UserState {
    token: string | null
    user: IUser | null
    
    interests: IUserInterestsCollection[] | null
    education: IUserEducation[] | null
    career: IUserCareer[] | null
    languages: ILanguage[] | null

    setUserInterests: (interests: IUserInterestsCollection[]) => void
    setUserEducation: (education: IUserEducation[]) => void
    setUserCareer: (career: IUserCareer[]) => void
    setUserLanguages: (languages: ILanguage[]) => void

    updateUser: (user: IUser) => void
    setAuth: (user: IUser, token: string) => void
    logout: () => void
}

export const useUserStore = create<UserState>((set) => ({

	token: null,
	user: null,

	setAuth: (user: IUser, token: string) => set((state: UserState) => ({
		user: user,
		token: token
	})),
	updateUser: (user: IUser) => set((state: UserState) => ({
		user: user,
	})),
	logout: () => set((state: UserState) => ({
		user: null,
		token: null
	})),
    
	interests: [],
	education: [],
	career: [],
	languages: [],

	setUserInterests(interests: IUserInterestsCollection[]) {
		set((state: UserState) => ({
			interests: interests
		}))
	},
	setUserCareer(career: IUserCareer[]) {
		set((state: UserState) => ({
			career: career
		}))
	},
	setUserEducation(education: IUserEducation[]) {
		set((state: UserState) => ({
			education: education
		}))
	},
	setUserLanguages(languages: ILanguage[]) {
		set((state: UserState) => ({
			languages: languages
		}))
	}
}))