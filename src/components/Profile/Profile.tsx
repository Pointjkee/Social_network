import React from 'react';
import {AvaD} from "./AvaD/AvaD";
import {WallContainer} from "./Wall/WallContainer";
import {profileType} from "../../Redux/store";

type propsType = {
    profile: profileType | null,
    status: string,
    updateStatus: (status: string) => void,
}

export const Profile = (props: propsType) => {
    return (
        <div>
            <AvaD profile={props.profile}
                  status={props.status}
                  updateStatus={props.updateStatus}
            />
            <WallContainer/>
        </div>
    )
}

