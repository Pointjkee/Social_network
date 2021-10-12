import React from 'react';
import {usersType} from "../../Redux/users-reducer";
import userPhoto from '../../Files/img/user.png';
import styles from './Users.module.css'

const {default: axios} = require('axios');

type usersPropsType = {
    users: usersType,
    follow: (userID: number) => void,
    unFollow: (userID: number) => void,
    setUsers: (users: usersType) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    setCurrentPage: (page: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

export class Users extends React.Component<usersPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)                     //ajax-запрос
            .then((response: any) => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (currentPage: number) => {
        this.props.setCurrentPage(currentPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)                     //ajax-запрос
            .then((response: any) => this.props.setUsers(response.data.items))
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
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
                            className={this.props.currentPage === t && styles.activePage || ''}
                            onClick={() => {
                                this.onPageChanged(t)
                            }}
                        >{t}</span>
                    })}
                </div>
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