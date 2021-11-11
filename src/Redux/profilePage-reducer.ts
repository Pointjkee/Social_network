import {profilePageType, profileType} from "./store"
import {profileAPI} from "../API/api";


const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"

export type AddPostActionType = {
    type: 'ADD-POST',
    // newPostText: string,
}
export type ChangeNewTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT',
    newText: string,
}
export type SetUserProfileType = {
    type: "SET_USER_PROFILE",
    profile: profileType | null
}
const initialState = {
    post: [
        {id: 1, message: 'Hi', likesCounter: 12},
        {id: 2, message: 'How are u?', likesCounter: 6},
    ],
    newPostText: 'IT-incubator',
    profile: null
}
type ActionsType = AddPostActionType | ChangeNewTextActionType | SetUserProfileType

export const profilePageReducer = (state: profilePageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCounter: 0,
            }
            let stateCopy = {...state}
            stateCopy.post = [...state.post]
            stateCopy.post.push(newPost)
            stateCopy.newPostText = ''
            return stateCopy
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state}
            stateCopy.newPostText = action.newText
            return stateCopy
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
    }
    return state
}

export const addPost = (): AddPostActionType => {
    return {
        type: ADD_POST
    }
}

export const updateNewPostText = (newText: string): ChangeNewTextActionType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText
    }
}
export const setUserProfile = (profile: profileType): SetUserProfileType => {
    return {
        type: SET_USER_PROFILE,
        profile
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