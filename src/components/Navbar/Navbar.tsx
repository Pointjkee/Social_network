import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css' //вместо classes можно любое назв

export const Navbar = () => {
    return (
        <nav className={classes.navbar}>
            <div className={classes.item}><NavLink to ='/profile' activeClassName={classes.activeLink}>Profile</NavLink></div>
            <div className={classes.item}><NavLink to='/dialogs' activeClassName={classes.activeLink}>Messages</NavLink></div>
            <div className={classes.item}><NavLink to='/News' activeClassName={classes.activeLink}>News</NavLink></div>
            <div className={classes.item}><NavLink to='/Music' activeClassName={classes.activeLink}>Music</NavLink></div>
            <div className={classes.item}><NavLink to='/Settings' activeClassName={classes.activeLink}>Settings</NavLink></div>
        </nav>
    )
}