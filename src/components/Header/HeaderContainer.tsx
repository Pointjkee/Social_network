import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {authThunk} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/storeRedux";

type HeaderPropsType = {
    isAuth: boolean,
    login: string | null,
    authThunk: any
}

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        this.props.authThunk()
    }

    render() {
        return <Header  {...this.props}  />
    }
}

type mapStateTopropsType = {
    isAuth: boolean,
    login: string | null,
}
const mapStateToprops = (state: AppStateType): mapStateTopropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToprops, {authThunk})(HeaderContainer)

