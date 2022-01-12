import classes from "./AvaD.module.css";
import React, {ChangeEvent} from "react";
import {profileType} from "../../../Redux/store";
import {Preloader} from "../../Common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";
import user from '../../../Files/img/user.png'

type propsType = {
    profile: profileType | null,
    status: string,
    updateStatus: (status: string) => void,
    isOwner: boolean,
    savePhotoTC: (photo: File) => void
}

export const AvaD = React.memo((props: propsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    const photoSelector = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhotoTC(e.target.files[0])
        }
    }
    return (
        <div className={classes.avaD}>
            <div className={classes.status}>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
            <div className={classes.ava}>
                {
                    props.profile.photos.large === null
                        ? <img src={user}/>
                        : <img src={props.profile.photos.large}/>
                }
                {props.isOwner && <input type={'file'} className={classes.inputFile} onChange={photoSelector}/>}

            </div>

            <div className={classes.d}>
                <div>Fullname: {props.profile.fullName} </div>
                <div>Looking for a job: {props.profile.lookingForAJob}</div>
                <div>Contacts: {props.profile.contacts.facebook}</div>
                <div>LookingForAJobDescription: {props.profile.lookingForAJobDescription} </div>
            </div>
        </div>
    )
})