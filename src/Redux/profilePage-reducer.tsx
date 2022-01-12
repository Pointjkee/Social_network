import {profilePageType, profileType} from "./store"
import {profileAPI} from "../API/api";
import {Dispatch} from "redux";

const initialState = {
    post: [
        {id: 1, message: 'Hi', likesCounter: 12},
        {id: 2, message: 'How are u?', likesCounter: 6},
    ],
    profile: {
        userId: null,
        lookingForAJob: null,
        lookingForAJobDescription: null,
        fullName: null,
        contacts: {
            github: null,
            vk: null,
            facebook: null,
            instagram: null,
            twitter: null,
            website: null,
            youtube: null,
            mainLink: null,
        },
        photos: {
            small: null,
            large: null,
        }
    },
    status: '',
}

type ActionsType = AddPostActionType | SetUserProfileType | SetStatusType | setPhotoType

export const profilePageReducer = (state: profilePageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'profilePage/ADD_POST': {
            let newPost = {
                id: 5,
                message: action.text,
                likesCounter: 0,
            }
            let stateCopy = {...state}
            stateCopy.post = [...state.post]
            stateCopy.post.push(newPost)
            return stateCopy
        }
        case 'profilePage/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'profilePage/SET_STATUS': {
            return {...state, status: action.status}
        }
        case 'profilePage/SET_PHOTO': {
            return {...state, profile: {...state.profile, photos: action.photo}}
        }
    }
    return state
}

export type AddPostActionType = ReturnType<typeof addPost>

export const addPost = (text: string) => {
    return {
        type: 'profilePage/ADD_POST',
        text
    } as const
}

export type SetUserProfileType = ReturnType<typeof setUserProfile>

export const setUserProfile = (profile: profileType) => {
    return {
        type: 'profilePage/SET_USER_PROFILE',
        profile
    } as const
}

export type SetStatusType = ReturnType<typeof setStatus>

export const setStatus = (status: string) => {
    return {
        type: 'profilePage/SET_STATUS',
        status
    } as const
}

export type setPhotoType = ReturnType<typeof setPhoto>
export type photoType = {
    small: string| null
    large: string| null
}

export const setPhoto = (photo: photoType ) => {
    return {
        type: 'profilePage/SET_PHOTO',
        photo
    } as const
}

export const getProfileThunkCreator = (userID: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userID)
    dispatch(setUserProfile(response))
}

export const getStatus = (userID: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userID)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhotoTC = (photo: File) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(photo)
    if (response.resultCode === 0) {
        debugger
        dispatch(setPhoto(response.data.photos))
    }
}