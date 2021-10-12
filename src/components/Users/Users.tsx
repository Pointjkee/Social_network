import React from 'react';
import {usersType} from "../../Redux/users-reducer";
import userPhoto from '../../Files/img/user.png';

const {default: axios} = require('axios');

type usersPropsType = {
    users: usersType,
    follow: (userID: number) => void,
    unFollow: (userID: number) => void,
    setUsers: (users: usersType) => void,
}

export class Users extends React.Component<usersPropsType> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')                     //ajax-запрос
            .then((response: any) => this.props.setUsers(response.data.items))
    }

    render() {
        return (
            <div style={{color: 'black'}}>

                {
                    this.props.users.map(u => {
                        const followHandler = () => {
                            this.props.follow(u.id)
                        }
                        const unFollowHandler = () => {
                            this.props.unFollow(u.id)
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
}