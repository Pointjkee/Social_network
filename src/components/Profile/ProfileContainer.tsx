import React from 'react';
import {Profile} from "./Profile";
import {postType, profileType} from "../../Redux/store";
import {connect} from "react-redux";
import {
    addPost,
    getProfileThunkCreator,
    getStatus, savePhotoTC,
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
    profile: profileType,
    match: {
        params: {
            userId: string
        }
    },
    getProfileThunkCreator: (userID: string) => void,
    setStatus: (status: string) => void,
    getStatus: (userID: string) => void,
    updateStatus: (status: string) => void,
    savePhotoTC: (photo: File) => void,
    status: string,
    authUserId: number,
    isAuth: boolean,
}

class ProfileContainer extends React.Component<ProfilePropsType> {
    setProfile = () => {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authUserId.toString()
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfileThunkCreator(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.setProfile()
    }

    componentDidUpdate(prevProps: ProfilePropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.setProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     isOwner={+this.props.match.params.userId === this.props.authUserId}
                     savePhotoTC={this.props.savePhotoTC}
            />
        )
    }
}

type profileTypeForMap = {
    profile: profileType,
    status: string,
    authUserId: number | null,
    isAuth: boolean,
}
const mapStateToProps = (state: AppStateType): profileTypeForMap => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {
            addPost,
            getProfileThunkCreator,
            getStatus,
            updateStatus,
            savePhotoTC
        }
    ),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
