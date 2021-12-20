import React from "react";

import userPhoto from "../../Files/img/user.png";
import {usersType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import {Pagination} from "../Common/Paginator/Pagination";

type usersTypeProps = {
    totalUsersCount: number,
    pageSize: number
    currentPage: number,
    users: usersType,
    onPageChanged: (currentPage: number) => void
    setFollowingInProgress: (followingInProgress: boolean, userID: number) => void,
    followingInProgress: (boolean | number)[],
    followThunkCreator: (userID: number) => void,
    unFollowThunkCreator: (userID: number) => void,
}

export const Users = (props: usersTypeProps) => {
    return (
        <div style={{color: 'black'}}>
            <Pagination currentPage={props.currentPage}
                        onPageChanged={props.onPageChanged}
                        totalUsersCount={props.totalUsersCount}
                        pageSize={props.pageSize}
            />
            {
                props.users.map(u => {
                    const followHandler = () => {
                        props.followThunkCreator(u.id)
                    }
                    const unFollowHandler = () => {
                        props.unFollowThunkCreator(u.id)
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
                                ?
                                <button onClick={unFollowHandler}
                                        disabled={props.followingInProgress.some(id => id === u.id)}>Unfollow</button>
                                : <button onClick={followHandler}
                                          disabled={props.followingInProgress.some(id => id === u.id)}>Follow</button>
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