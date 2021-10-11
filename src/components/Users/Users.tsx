// import * as axios from 'axios';
import React from 'react';
import {usersType} from "../../Redux/users-reducer";
import userPhoto from '../../Files/img/user.png';
const { default: axios } = require('axios');

type usersPropsType = {
    users: usersType,
    follow: (userID: number) => void,
    unFollow: (userID: number) => void,
    setUsers: (users: usersType) => void,
}
export const Users = (props: usersPropsType) => {

    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then((response:any) => props.setUsers(response.data.items) )
    }
    /* if (props.users.length === 0){
         props.setUsers([
             {
                 id: 1,
                 photoUrl: 'https://pbs.twimg.com/profile_images/1222646977332174849/xWcD6t_Q.jpg',
                 followed: true,
                 fullName: 'Denis',
                 status: 'Im learning',
                 location: {city: "Minsk", country: 'Belarus'}
             },
             {
                 id: 2,
                 photoUrl: 'https://pbs.twimg.com/profile_images/1222646977332174849/xWcD6t_Q.jpg',
                 followed: false,
                 fullName: 'GLeb',
                 status: 'Im learning too',
                 location: {city: "Ostrovec", country: 'Belarus'}
             },
             {
                 id: 3,
                 photoUrl: 'https://pbs.twimg.com/profile_images/1222646977332174849/xWcD6t_Q.jpg',
                 followed: false,
                 fullName: 'Alex',
                 status: 'Im working',
                 location: {city: "Grodno", country: 'Belarus'}
             }
         ])
     }*/
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
                        <img src={u.photoUrl != null ? u.photoUrl : userPhoto} style={{width: 100, height: 100}}/>
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

