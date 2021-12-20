import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {loginOut} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/storeRedux";
import {compose} from "redux";

type HeaderPropsType = {
    isAuth: boolean,
    login: string | null,
    loginOut: () => void,
}

class HeaderContainer extends React.Component<HeaderPropsType> {
    render() {
        return <Header  {...this.props}  />
    }
}

type mapStateTopPropsType = {
    isAuth: boolean,
    login: string | null,
}
const mapStateToprops = (state: AppStateType): mapStateTopPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToprops, {loginOut}))(HeaderContainer)

