import d from "../Dialogs.module.css";
import React from "react";
import {messagesType} from "../../../Redux/state";

export const Message = (props: messagesType) => {
    return (
        <div>
            <div className={d.message}>
                {props.message}
            </div>
        </div>

    )
}