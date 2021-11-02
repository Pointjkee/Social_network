import {connect} from "react-redux";
import {AppStateType} from "../../Redux/storeRedux";
import {
    follow,
    setCurrentPage,
    setIsFetching,
    setTotalUsersCount,
    setUsers,
    unFollow,
    usersType
} from "../../Redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../Common/Preloader/Preloader";

const {default: axios} = require('axios');


type usersPropsType = {
    users: usersType,
    follow: (userID: number) => void,
    unFollow: (userID: number) => void,
    setUsers: (users: usersType) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    setCurrentPage: (page: number) => void,
    setTotalUsersCount: (totalCount: number) => void,
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,

}
type UsersResponseType = {
    data: {
        error: string | null,
        items: usersType,
        totalCount: number,
    }
}
class UsersContainer extends React.Component<usersPropsType> {
    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)                     //ajax-запрос
            .then((response: UsersResponseType) => {
                debugger
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (currentPage: number) => {
        this.props.setIsFetching(true)
        this.props.setCurrentPage(currentPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)                     //ajax-запрос
            .then((response: any) => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
            })

    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                onPageChanged={this.onPageChanged}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps,
    {
        follow,
        unFollow,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        setIsFetching
    }
)(UsersContainer)