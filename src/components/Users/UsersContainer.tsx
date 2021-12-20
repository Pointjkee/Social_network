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
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPagesSize,
    getTotalUsersCount,
    getUsers
} from "../../Redux/users-selectors";

type usersPropsType = {
    users: usersType,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    setFollowingInProgress: (followingInProgress: boolean, userID: number) => void,
    followingInProgress: (boolean | number)[],
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void,
    followThunkCreator: (userID: number) => void,
    unFollowThunkCreator: (userID: number) => void,
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
        users: getUsers(state),
        pageSize: getPagesSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps,
    {
        setFollowingInProgress,
        getUsersThunkCreator,
        unFollowThunkCreator,
        followThunkCreator
    }
    ),
    withAuthRedirect
)(UsersContainer)