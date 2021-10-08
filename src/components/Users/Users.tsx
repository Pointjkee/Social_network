import React from 'react';
import {usersType} from "../../Redux/users-reducer";

type usersPropsType = {
    users: usersType,
    follow: (userID: number) => void,
    unFollow: (userID: number) => void,
    setUsers: (users: usersType) => void,
}
export const Users = (props: usersPropsType) => {
    return (
        <div style={{color: 'black'}}>
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
                        <img src={u.photoUrl} style={{width: 100, height: 100}}/>
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
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
                    </div>
                })
            }


        </div>
    )
}

