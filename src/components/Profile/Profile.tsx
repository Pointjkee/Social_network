import React from 'react';
import {AvaD} from "./AvaD/AvaD";
import { storeType} from '../../Redux/store';
import {WallContainer} from "./Wall/WallContainer";

type ProfilePropsType = {
    store: storeType
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <AvaD/>
            <WallContainer store={props.store}/>
        </div>
    )
}

