import React from 'react';
import {Wall} from "./Wall/Wall";
import {AvaD} from "./AvaD/AvaD";
import {ActionsTypes, profilePageType} from '../../Redux/store';

type ProfilePropsType = {
    profilePage: profilePageType
    dispatch: (action: ActionsTypes) => void
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <AvaD/>
            <Wall profilePage={props.profilePage}
                  dispatch={props.dispatch}
            />
        </div>
    )
}

