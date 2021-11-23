import React from 'react';
import {Profile} from "./Profile";
import {postType, profileType} from "../../Redux/store";
import {connect} from "react-redux";
import {
    addPost,
    getProfileThunkCreator,
    getStatus,
    updateStatus
} from "../../Redux/profilePage-reducer";
import {AppStateType} from '../../Redux/storeRedux';
import {RouteComponentProps, withRouter} from 'react-router';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

type PathParamsType = {
    userId?: string
}
type ProfilePropsType = RouteComponentProps<PathParamsType> & {
    post?: Array<postType>,
    newPostText?: string,
    addPost: () => void,
    profile: profileType | null,
    match: {
        params: {
            userId: string
        }
    },
    getProfileThunkCreator: any,
    setStatus: (status: string) => void,
    getStatus: (userID: string) => void,
    updateStatus: (status: string) => void,
    status: string,
}

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '20082'
        }
        this.props.getProfileThunkCreator(userId)
        this.props.getStatus(userId)
       }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
            />
        )
    }
}

type profileTypeForMap = {
    profile: profileType | null,
    status: string | null,
}
const mapStateToProps = (state: AppStateType): profileTypeForMap => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {
            addPost,
            getProfileThunkCreator,
            getStatus,
            updateStatus,
        }
    ),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
