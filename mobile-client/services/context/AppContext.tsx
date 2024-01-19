import React, { createContext, useContext, Dispatch, ReactNode } from "react"
import { IUser, IUserCareer, IUserEducation, IUserInterestsCollection, ILanguage, IChat, IChatMessage } from "../interfaces"


interface UserState {
    token: string | null
    user: IUser | null
    interests: IUserInterestsCollection[] | null
    education: IUserEducation[] | null
    career: IUserCareer[] | null
    languages: ILanguage[] | null
    chats: IChat[]
}

type Action =
    | { type: "SET_AUTH"; user: IUser; token: string }
    | { type: "UPDATE_USER"; user: IUser }
    | { type: "LOGOUT" }
    | { type: "SET_USER_INTERESTS"; interests: IUserInterestsCollection[] }
    | { type: "SET_USER_EDUCATION"; education: IUserEducation[] }
    | { type: "SET_USER_CAREER"; career: IUserCareer[] }
    | { type: "SET_USER_LANGUAGES"; languages: ILanguage[] }
    | { type: "SET_CHATS"; chats: IChat[] }


const initialState: UserState = {
    token: null,
    user: null,
    interests: [],
    education: [],
    career: [],
    languages: [],
    chats: [],
}

const AppContext = createContext<{
    appState: UserState; dispatch: Dispatch<Action>
    setUserInterests: (interests: IUserInterestsCollection[]) => void
    setUserEducations: (education: IUserEducation[]) => void
    setUserCareer: (career: IUserCareer[]) => void
    setUserLanguages: (languages: ILanguage[]) => void
    updateUser: (user: IUser) => void
    setAuth: (user: IUser, token: string) => void
    logout: () => void
    setChats: (chats: IChat[]) => void
} | undefined>(undefined)


const userAppReducer = (appState: UserState, action: Action): UserState => {
    switch (action.type) {
        case "SET_AUTH":
            return { ...appState, user: action.user, token: action.token }
        case "UPDATE_USER":
            return { ...appState, user: action.user }
        case "LOGOUT":
            return { ...initialState }
        case "SET_USER_INTERESTS":
            return { ...appState, interests: action.interests }
        case "SET_USER_EDUCATION":
            return { ...appState, education: action.education }
        case "SET_USER_CAREER":
            return { ...appState, career: action.career }
        case "SET_USER_LANGUAGES":
            return { ...appState, languages: action.languages }
        case "SET_CHATS":
            return { ...appState, chats: action.chats }
        default:
            return appState
    }
}

interface AppProviderProps {
    children: ReactNode
}
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [appState, dispatch] = React.useReducer(userAppReducer, initialState)
    const setUserInterests = (interests: IUserInterestsCollection[]) => {
        dispatch({ type: "SET_USER_INTERESTS", interests })
    }

    const setUserEducations = (education: IUserEducation[]) => {
        dispatch({ type: "SET_USER_EDUCATION", education })
    }

    const setUserCareer = (career: IUserCareer[]) => {
        dispatch({ type: "SET_USER_CAREER", career })
    }

    const setUserLanguages = (languages: ILanguage[]) => {
        dispatch({ type: "SET_USER_LANGUAGES", languages })
    }

    const updateUser = (user: IUser) => {
        dispatch({ type: "UPDATE_USER", user: user })
    }

    const setAuth = (user: IUser, token: string) => {
        dispatch({ type: "SET_AUTH", user, token })
    }

    const logout = () => {
        dispatch({ type: "LOGOUT" })
    }

    const setChats = (chats: IChat[]) => {
        dispatch({ type: "SET_CHATS", chats })
    }


    return (
        <AppContext.Provider value={ {
            appState,
            dispatch,
            setUserInterests,
            setUserEducations,
            setUserCareer,
            setUserLanguages,
            updateUser,
            setAuth,
            logout,
            setChats
        } }>
            { children }
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppContext must be used within a AppProvider")
    }
    return context
}

export { useAppContext, userAppReducer, initialState, AppContext, AppProvider }
