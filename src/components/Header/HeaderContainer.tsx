import axios from 'axios';
import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {setAuthUserData} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/storeRedux";


type responseType = {
    data: {
        data: {
            id: number,
            email: string,
            login: string,
        },
        resultCode: number,
        messages: string[]
    }
}
type HeaderPropsType = {
    setAuthUserData: (userId: number, email: string, login: string) => void,
    isAuth: boolean,
    login: string  | null,
}

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })                     //ajax-запрос
            .then((response: responseType) => {
                if (response.data.resultCode === 0) {
                    this.props.setAuthUserData(response.data.data.id, response.data.data.email, response.data.data.login)
                }
            })

    }

    render() {
        return <Header  {...this.props}  />

    }
}
type mapStateTopropsType = {
    isAuth: boolean,
    login: string  | null,
}
const mapStateToprops = (state: AppStateType):mapStateTopropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})


export default connect(mapStateToprops, {setAuthUserData})(HeaderContainer)

