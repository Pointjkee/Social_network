import {AddPostActionType} from "./profilePage-reducer";
import {SendMessageActionType} from "./messagesPage-reducer";

export type ActionsTypes =
    AddPostActionType
    | SendMessageActionType


export type messagesType = {
    id: number,
    message: string
}
export type dialogsType = {
    id: number,
    name: string
}
export type postType = {
    id: number,
    message: string,
    likesCounter: number
}
export type messagesPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
}
export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}
export type profilePageType = {
    post: Array<postType>
    profile: profileType | null,
    status: string
}

