import {ActionsTypes, messagesPageType} from "./store"


const SEND_MESSAGE = "SEND_MESSAGE"


export type SendMessageActionType = {
    type: 'SEND_MESSAGE',
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Denis'},
        {id: 2, name: 'Ylia'},
        {id: 3, name: 'Dymich'}],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are u?'},
        {id: 3, message: 'Where are u?'}
    ],
}

export const messagesPageReducer = (state: messagesPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let stateCopy = {...state}
            stateCopy.messages = [...state.messages]
            stateCopy.messages.push({id: 4, message: action.message})
            return stateCopy;
        }
    }
    return state
}

export const sendMessageClick = (message: string): SendMessageActionType => {
    return {
        type: SEND_MESSAGE,
        message,
    }
}
