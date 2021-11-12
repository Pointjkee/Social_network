import React, {Component, ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/storeRedux";

type isAuthToPropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): isAuthToPropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    function RedirectComponent(props: isAuthToPropsType) {
        let {isAuth, ...restProps} = props
        return (!isAuth) ? <Redirect to={'/login'}/> : <Component {...restProps as T} />
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}