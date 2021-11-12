import classes from "./AvaD.module.css";
import React from "react";
import {profileType} from "../../../Redux/store";
import {Preloader} from "../../Common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";

type propsType = {
    profile: profileType | null
}

export const AvaD = (props: propsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={classes.avaD}>
            <div className={classes.status}>
                <ProfileStatus status={'1'}/>
            </div>
            <div className={classes.ava}>
                <img src={props.profile.photos.large}/>
            </div>

            <div className={classes.d}>
                <div>Fullname: {props.profile.fullName} </div>
                <div>Looking for a job: {props.profile.lookingForAJob}</div>
                <div>Contacts: {props.profile.contacts.facebook}</div>
                <div>LookingForAJobDescription: {props.profile.lookingForAJobDescription} </div>
            </div>
        </div>
    )
}