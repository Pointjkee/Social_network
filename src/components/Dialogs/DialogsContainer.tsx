import React from 'react';
import {sendMessageClick, onNewMessageChange} from '../../Redux/messagesPage-reducer';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {messagesPageType} from "../../Redux/store";
import {AppStateType} from "../../Redux/storeRedux";


type MapStateToPropsType = {
    messagesPage: messagesPageType
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messagesPage: state.messagesPage
    }
}

export const DialogsContainer = connect(mapStateToProps, {onNewMessageChange,sendMessageClick})
(Dialogs)