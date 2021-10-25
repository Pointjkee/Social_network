import{AddPostActionType, ChangeNewTextActionType} from "./profilePage-reducer";
import { NewMessageTextActionType, SendMessageActionType} from "./messagesPage-reducer";

type  subscribeType = () => void

export type storeType = {
    _state: stateType,
    getState: () => stateType,
    subscribe: (observer: subscribeType) => void
    dispatch: (action: ActionsTypes) => void
}
export type ActionsTypes =
    AddPostActionType
    | ChangeNewTextActionType
    | NewMessageTextActionType
    | SendMessageActionType

/*export let store: storeType = {
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
            ],
            newMessageText: ' '
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
        this._state.profilePage = profilePageReducer(this._state.profilePage, action)
        this._state.messagesPage = messagesPageReducer(this._state.messagesPage, action)
        reRenderAll()
    }
}*/

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
    newMessageText: string
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
    newPostText: string
    profile: profileType | null
}
export type stateType = {
    messagesPage: messagesPageType
    profilePage: profilePageType
}

