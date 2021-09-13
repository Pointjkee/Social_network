import React, {createRef} from 'react';
import d from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from './Messages/Message';
import {messagesPageType} from "../../Redux/state";


type DialogsPropsType = {
    state:messagesPageType
}


let postElement = createRef<HTMLInputElement>()
let addPost = () => {
    if (postElement.current) {
        let text = postElement.current.value
        alert(text)
    }
}


export const Dialogs = (props: DialogsPropsType) => {
    return (
        <div className={d.dialogs}>
            <div className={d.dialogsItems}>
                {props.state.dialogs.map((el) => <DialogItem name={el.name} id={el.id}/>)}
            </div>
            <div className={d.messages}>
                <input type="Поделись новостью" size={40} ref={postElement}/>
                <input type="button" value="Send" onClick={addPost} className={d.button}/>
                {props.state.messages.map((el) => <Message message={el.message} id={el.id}/>)}

            </div>
                 </div>
    )
}