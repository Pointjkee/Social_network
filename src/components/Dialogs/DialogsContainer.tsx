import React from 'react';
import {storeType} from "../../Redux/store";
import {sendMessageCreater, updateNewMessageTextCreater} from '../../Redux/messagesPage-reducer';
import {Dialogs} from "./Dialogs";

type DialogsPropsType = {
    store: storeType
}
export const DialogsContainer = (props: DialogsPropsType) => {
    let state = props.store.getState().messagesPage
    const onNewMessageChange = (text:string) => {
         props.store.dispatch(updateNewMessageTextCreater(text))
    }
    const sendMessageClick = () => {
        props.store.dispatch(sendMessageCreater())
    }
    return (
      <Dialogs onNewMessageChange={onNewMessageChange}
               sendMessageClick={sendMessageClick}
               dialogs={state.dialogs}
               messages={state.messages}
               newMessageText={state.newMessageText}
      />
    )
}