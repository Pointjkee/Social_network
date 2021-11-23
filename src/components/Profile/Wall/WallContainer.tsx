import React from 'react';
import {profilePageType} from "../../../Redux/store";
import { addPost} from '../../../Redux/profilePage-reducer';
import {Wall} from "./Wall";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/storeRedux";

type MapStateToPropsType = {
    profilePage: profilePageType
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}

export const WallContainer = connect(mapStateToProps, {addPost})(Wall)