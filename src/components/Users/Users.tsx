import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../Files/img/user.png";
import {usersType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";

type usersTypeProps = {
    totalUsersCount: number,
    pageSize: number
    currentPage: number,
    users: usersType,
    follow: (userID: number) => void,
    unFollow: (userID: number) => void,
    onPageChanged: (currentPage: number) => void
}


export const Users = (props: usersTypeProps) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div style={{color: 'black'}}>
            <div>
                {pages.slice(0, 10).map(t => {
                    return <span
                        style={{cursor: 'pointer'}}
                        className={props.currentPage === t && styles.activePage || ''}
                        onClick={() => {
                            props.onPageChanged(t)
                        }}
                    >{t}</span>
                })}
            </div>
            {
                props.users.map(u => {
                    const followHandler = () => {
                        props.follow(u.id)
                    }
                    const unFollowHandler = () => {
                        props.unFollow(u.id)
                    }

                    return <div key={u.id}>
                <span>
                    <div>
                       <NavLink to={'/profile/' + u.id}>
                            <img src={u.photoUrl != null ? u.photoUrl : userPhoto} style={{width: 100, height: 100}}/>
                       </NavLink>
                    </div>
                    <div>
                        {
                            u.followed
                                ? <button onClick={followHandler}>Follow</button>
                                : <button onClick={unFollowHandler}>Unfollow</button>
                        }

                    </div>
                </span>
                        <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
                    </div>
                })
            }
        </div>
    )
}