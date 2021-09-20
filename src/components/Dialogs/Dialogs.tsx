import React, {ChangeEvent} from 'react';
import d from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from './Messages/Message';
import {storeType} from "../../Redux/state";
import {sendMessageCreater, updateNewMessageTextCreater } from '../../Redux/messagesPage-reducer';


type DialogsPropsType = {
    store: storeType
}


export const Dialogs = (props: DialogsPropsType) => {

    let state = props.store.getState().messagesPage

    const onNewMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        let text = e.currentTarget.value
        props.store.dispatch(updateNewMessageTextCreater(text))
    }
    const sendMessageClick = () => {
        props.store.dispatch(sendMessageCreater())
    }
    return (
        <div className={d.dialogs}>
            <div className={d.dialogsItems}>
                {state.dialogs.map(el => <DialogItem name={el.name} id={el.id}/>)}
            </div>
            <div className={d.messages}>
                <div>
                    {state.messages.map(el => <Message message={el.message} id={el.id}/>)}
                </div>
                <div>
                    <input size={40}
                           value={state.newMessageText}
                           onChange={onNewMessageChange}/>
                </div>
                <div>
                    <button onClick={sendMessageClick} className={d.button}>Send</button>
                </div>
            </div>
        </div>
    )
}