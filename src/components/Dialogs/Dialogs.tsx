import React, {ChangeEvent} from 'react';
import d from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from './Messages/Message';
import {dialogsType, messagesType} from "../../Redux/store";

type DialogsPropsType = {
    onNewMessageChange: (text: string) => void
    sendMessageClick: () => void
    dialogs:Array<dialogsType>
    messages:Array<messagesType>
    newMessageText:string
}
export const Dialogs = (props: DialogsPropsType) => {
    const onNewMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        let text = e.currentTarget.value
            props.onNewMessageChange(text)
    }
    const sendMessageClick = () => {
        props.sendMessageClick()
    }
    return (
        <div className={d.dialogs}>
            <div className={d.dialogsItems}>
                {props.dialogs.map(el => <DialogItem name={el.name} id={el.id}/>)}
            </div>
            <div className={d.messages}>
                <div>
                    {props.messages.map(el => <Message message={el.message} id={el.id}/>)}
                </div>
                <div>
                    <input size={40}
                           value={props.newMessageText}
                           onChange={onNewMessageChange}/>
                </div>
                <div>
                    <button onClick={sendMessageClick}
                            className={d.button}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}