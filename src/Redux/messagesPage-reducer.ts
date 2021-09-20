const UPDATE_NEW_MESSAGE_TEXT = "UPDATE_NEW_MESSAGE_TEXT"
const SEND_MESSAGE = "SEND_MESSAGE"

export type NewMessageTextActionType = {
    type: 'UPDATE_NEW_MESSAGE_TEXT',
    text: string,
}
export type SendMessageActionType = {
    type: 'SEND_MESSAGE'
}

export const messagesPageReducer = (state: any, action: any) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.text
            break;
        case SEND_MESSAGE:
            let body = state.newMessageText
            state.messages.push({id: 4, message: body})
            state.newMessageText = ''
            break;
          }
    return state
}

//action creator для dialogs.tsx

export const sendMessageCreater = (): SendMessageActionType => {
    return {
        type: SEND_MESSAGE
    }
}
export const updateNewMessageTextCreater = (text: string): NewMessageTextActionType => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        text: text
    }
}