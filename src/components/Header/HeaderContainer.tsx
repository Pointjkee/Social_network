import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {authThunk, loginOut} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/storeRedux";


type HeaderPropsType = {
    isAuth: boolean,
    login: string | null,
    authThunk: any,
    loginOut: any,
}

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        this.props.authThunk()
    }

    render() {
        return <Header  {...this.props}  />
    }
}

type mapStateTopPropsType = {
    isAuth: boolean,
    login: string | null,
}
const mapStateToprops = (state: AppStateType): mapStateTopPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToprops, {authThunk, loginOut})(HeaderContainer)

