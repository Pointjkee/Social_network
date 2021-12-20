import d from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {dialogsType} from "../../../Redux/store";


export const DialogItem = React.memo((props: dialogsType) => {
    return (
        <div className={d.dialog}>
            <NavLink to={'/dialogs/' + props.id}
                     activeClassName={d.activeLink}>{props.name}
            </NavLink>
        </div>
    )
})