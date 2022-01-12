import {messagesPageType} from "./store"

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

export const messagesPageReducer = (state: messagesPageType = initialState, action: SendMessageActionType) => {
    switch (action.type) {
        case 'messagePage/SEND_MESSAGE': {
            let stateCopy = {...state}
            stateCopy.messages = [...state.messages]
            stateCopy.messages.push({id: 4, message: action.message})
            return stateCopy;
        }
    }
    return state
}

export type SendMessageActionType = ReturnType<typeof sendMessageClick>

export const sendMessageClick = (message: string) => {
    return {type: 'messagePage/SEND_MESSAGE', message}
}
