import React from 'react';
import d from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from './Messages/Message';
import {messagesPageType} from "../../Redux/store";
import {DialogForm} from "./DialogForm";

export type DialogsPropsType = {
    sendMessageClick: (message: string) => void
    messagesPage: messagesPageType
    isAuth: boolean
}
export const Dialogs =React.memo( (props: DialogsPropsType) => {
    return (
        <div className={d.dialogs}>
            <div className={d.dialogsItems}>
                {props.messagesPage.dialogs.map(el => <DialogItem name={el.name} id={el.id}/>)}
            </div>
            <div className={d.messages}>
                <div>
                    {props.messagesPage.messages.map(el => <Message message={el.message} id={el.id}/>)}
                </div>
                <DialogForm sendMessage={props.sendMessageClick}/>

            </div>
        </div>

    )
})