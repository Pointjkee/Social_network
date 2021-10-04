import React from 'react';
import {profilePageType} from "../../../Redux/store";
import {addNewPostHandlerActionCreater, addPostActionCreater} from '../../../Redux/profilePage-reducer';
import {Wall} from "./Wall";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/storeRedux";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    profilePage: profilePageType
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewPostText: (text: string) => {
            dispatch(addNewPostHandlerActionCreater(text))
        },
        addPost: () => {
            dispatch(addPostActionCreater())
        }
    }
}

export const WallContainer = connect(mapStateToProps, mapDispatchToProps)(Wall)