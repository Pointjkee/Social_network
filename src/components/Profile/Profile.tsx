import React from 'react';
import {AvaD} from "./AvaD/AvaD";
import {WallContainer} from "./Wall/WallContainer";
import {profileType} from "../../Redux/store";

type propsType ={
    profile:profileType | null
}

export const Profile = (props:propsType) => {
    return (
        <div>
            <AvaD profile={props.profile}/>
            <WallContainer/>
        </div>
    )
}

