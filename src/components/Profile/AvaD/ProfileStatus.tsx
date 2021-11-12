import React, {useState} from "react";

type propsType = {
    status: string
}

export const ProfileStatus = (props: propsType) => {
    const [editMode, setEitMode] = useState<boolean>(false)
        const editModeHandlerOn = ()=> {
            setEitMode(true)
        }
        const editModeHandlerOff = ()=> {
            setEitMode(false)
        }


    return (
        <div>
            {!editMode && <div>
                <span onDoubleClick={editModeHandlerOn} >{props.status}</span>
            </div>}
            {editMode && <div>
                <input onBlur={editModeHandlerOff} value={props.status} autoFocus={true}/>
            </div>}
        </div>
    )
}
