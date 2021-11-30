import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean,
    login: string | null,
    loginOut: any,
}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img
                src='https://i.ibb.co/QXkdTv9/IT-INCUBATOR.png'
                alt=''/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div> {props.login} - <button onClick={props.loginOut}>Logout</button></div>
                    : <NavLink to={'/login'}> Login </NavLink>}
            </div>
        </header>
    )
}

