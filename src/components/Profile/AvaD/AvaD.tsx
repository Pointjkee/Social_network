import classes from "./AvaD.module.css";
import React from "react";
import {profileType} from "../../../Redux/store";
import {Preloader} from "../../Common/Preloader/Preloader";

type propsType = {
    profile: profileType | null
}

export const AvaD = (props: propsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={classes.avaD}>
            <div className={classes.ava}>
                {/* <img
                    src="https://pristor.ru/wp-content/uploads/2020/03/%D0%90%D0%B2%D0%B0-%D0%B2-%D0%B2%D0%BA-%D0%B2-%D0%BE%D1%82%D0%BF%D1%83%D1%81%D0%BA%D0%B5-%D0%BE%D1%87%D0%B5%D0%BD%D1%8C-%D0%BF%D1%80%D0%B8%D0%BA%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-2.jpg"
                    alt=""/>*/}
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