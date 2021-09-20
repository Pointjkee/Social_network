import {ActionsTypes, profilePageType} from "./store"

const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"

export type AddPostActionType = {
    type: 'ADD-POST',
    newPostText: string,
}
export type ChangeNewTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT',
    newText: string,
}

let initialState = {
    post: [
        {id: 1, message: 'Hi', likesCounter: 12},
        {id: 2, message: 'How are u?', likesCounter: 6},
    ],
    newPostText: 'IT-incubator'
}

export const profilePageReducer = (state: profilePageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCounter: 0,
            }
            state.post.push(newPost)
            state.newPostText = ''
            break;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            break;
      }
    return state
}

//action creator для wall.tsx

export const addPostActionCreater = (newPostText: string): AddPostActionType => {
    return {
        type: ADD_POST,
        newPostText: newPostText
    }
}
export const addNewPostHandlerActionCreater = (newText: string): ChangeNewTextActionType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    }
}