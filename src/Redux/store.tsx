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
    userId: number| null
    lookingForAJob: boolean| null
    lookingForAJobDescription: string| null
    fullName: string| null
    contacts: {
        github: string| null
        vk: string| null
        facebook: string| null
        instagram: string| null
        twitter: string| null
        website: string| null
        youtube: string| null
        mainLink: string| null
    }
    photos: {
        small: string| null
        large: string| null
    }
}
export type profilePageType = {
    post: Array<postType>
    profile: profileType,
    status: string
}

