import {sendMessageClick} from '../../Redux/messagesPage-reducer';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {messagesPageType} from "../../Redux/store";
import {AppStateType} from "../../Redux/storeRedux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = {
    messagesPage: messagesPageType,
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messagesPage: state.messagesPage,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessageClick}),
    withAuthRedirect,
)(Dialogs)
