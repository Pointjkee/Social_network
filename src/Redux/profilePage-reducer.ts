import {profilePageType, profileType} from "./store"
import {profileAPI} from "../API/api";


const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"

export type AddPostActionType = {
    type: 'ADD-POST',
    text: string
}

export type SetUserProfileType = {
    type: "SET_USER_PROFILE",
    profile: profileType | null
}
export type SetStatusType = {
    type: 'SET_STATUS',
    status: string,
}

const initialState = {
    post: [
        {id: 1, message: 'Hi', likesCounter: 12},
        {id: 2, message: 'How are u?', likesCounter: 6},
    ],
    profile: null,
    status: '',
}
type ActionsType = AddPostActionType | SetUserProfileType | SetStatusType

export const profilePageReducer = (state: profilePageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_POST: {
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
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
    }
    return state
}

export const addPost = (text: string): AddPostActionType => {
    return {
        type: ADD_POST,
        text
    }
}

export const setUserProfile = (profile: profileType): SetUserProfileType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export const setStatus = (status: string): SetStatusType => {
    return {
        type: SET_STATUS,
        status
    }
}

export const getProfileThunkCreator = (userID: string) => {
    return (dispatch: any) => {
        profileAPI.getProfile(userID)
            .then((data: profileType) => {
                dispatch(setUserProfile(data))
            })
    }
}
type resStatusType = {
    data: string,
}

export const getStatus = (userID: string) => (dispatch: any) => {
    profileAPI.getStatus(userID)
        .then((res: resStatusType) => {
            dispatch(setStatus(res.data))
        })
}
type resUpdateStatusType = {
    resultCode: number,
    messages: string[],
    data: {}
}

export const updateStatus = (status: string) => (dispatch: any) => {
    profileAPI.updateStatus(status)
        .then((res: resUpdateStatusType) => {
            if (res.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}

