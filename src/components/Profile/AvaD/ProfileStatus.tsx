import React, {useState} from "react";
import {ChangeEvent} from "react";

type propsType = {
    status: string,
    updateStatus: (status: string) => void,
}

export const ProfileStatus = React.memo((props: propsType) => {
    const [editMode, setEitMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.status)
    const editModeHandlerOn = () => {
        setEitMode(true)
        setTitle(props.status)
    }
    const editModeHandlerOff = () => {
        setEitMode(false)
        if (title !== '') {
            props.updateStatus(title)
        }
    }
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode && <div>
                <span onDoubleClick={editModeHandlerOn}>{props.status }</span>
            </div>}
            {editMode && <div>
                <input onBlur={editModeHandlerOff}
                       value={title}
                       autoFocus={true}
                       onChange={inputHandler}/>
            </div>}
        </div>
    )
})
