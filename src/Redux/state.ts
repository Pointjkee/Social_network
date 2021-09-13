const ADD_POST = "ADD-POST"
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"


let reRenderAll = () => {
    console.log('state changed')
}

type storeType = {
    _state:stateType,
    getState: () => stateType,
    subscribe: (observer: subscribeType) => void
    dispatch: (action: ActionsTypes) => void
}
export type ActionsTypes = AddPostActionType | ChangeNewTextActionType

type AddPostActionType ={
    type: 'ADD-POST',
    newPostText: string,
}
type ChangeNewTextActionType ={
    type: 'UPDATE-NEW-POST-TEXT',
    newText: string,
}

export let store:storeType = {
    _state: {
        messagesPage: {
            dialogs: [
                {id: 1, name: 'Denis'},
                {id: 2, name: 'Ylia'},
                {id: 3, name: 'Dymich'}],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are u?'},
                {id: 3, message: 'Where are u?'}
            ]
        },
        profilePage: {
            post: [
                {id: 1, message: 'Hi', likesCounter: 12},
                {id: 2, message: 'How are u?', likesCounter: 6},
            ],
            newPostText: 'IT-incubator'
        }
    },
    getState() {
        return this._state
    },
    subscribe(observer: subscribeType) {
        reRenderAll = observer
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: store._state.profilePage.newPostText,
                likesCounter: 0,
            }
            this._state.profilePage.post.push(newPost)
            this._state.profilePage.newPostText = ''
            reRenderAll()
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText
            reRenderAll()
        }
    }
}

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
export type profilePageType = {
    post: Array<postType>
    newPostText: string
}

export type stateType = {
    messagesPage: messagesPageType
    profilePage: profilePageType
}

type  subscribeType = () => void


//Создает action creator для wall.tsx

export const addPostActionCreater = (newPostText:string):AddPostActionType => {
    return {
        type: ADD_POST,
        newPostText: newPostText
    }
}
export const addNewPostHandlerActionCreater = (newText:string):ChangeNewTextActionType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    }
}

// export type ActionTypes = 'UPDATE-NEW-POST-TEXT' | 'ADD-POST'



