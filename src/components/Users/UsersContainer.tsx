import {connect} from "react-redux";
import {AppStateType} from "../../Redux/storeRedux";
import {
    followThunkCreator,
    getUsersThunkCreator,
    setFollowingInProgress,
    unFollowThunkCreator,
    usersType
} from "../../Redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../Common/Preloader/Preloader";


type usersPropsType = {
    users: usersType,
    follow: (userID: number) => void,
    unFollow: (userID: number) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    setFollowingInProgress: (followingInProgress: boolean, userID: number) => void,
    followingInProgress: (boolean | number)[],
    getUsersThunkCreator: any,
    followThunkCreator: any,
    unFollowThunkCreator: any,
}

class UsersContainer extends React.Component<usersPropsType> {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (currentPage: number) => {
        this.props.getUsersThunkCreator(currentPage, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                setFollowingInProgress={this.props.setFollowingInProgress}
                followingInProgress={this.props.followingInProgress}
                followThunkCreator={this.props.followThunkCreator}
                unFollowThunkCreator={this.props.unFollowThunkCreator}
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
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default connect(mapStateToProps,
    {
        setFollowingInProgress,
        getUsersThunkCreator,
        unFollowThunkCreator,
        followThunkCreator
    }
)(UsersContainer)