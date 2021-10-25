import React from 'react';
import {sendMessageClick, onNewMessageChange} from '../../Redux/messagesPage-reducer';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {messagesPageType} from "../../Redux/store";
import {AppStateType} from "../../Redux/storeRedux";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    messagesPage: messagesPageType
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messagesPage: state.messagesPage
    }
}
/*const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onNewMessageChange,
        sendMessageClick
    }
}*/

export const DialogsContainer = connect(mapStateToProps, {onNewMessageChange,sendMessageClick})
(Dialogs)