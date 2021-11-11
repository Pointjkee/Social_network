import React from 'react';
import {Profile} from "./Profile";
import {postType, profileType} from "../../Redux/store";
import {connect} from "react-redux";
import {addPost, getProfileThunkCreator, updateNewPostText} from "../../Redux/profilePage-reducer";
import {AppStateType} from '../../Redux/storeRedux';
import {RouteComponentProps, withRouter} from 'react-router';

type PathParamsType = {
    userId?: string
}
type ProfilePropsType = RouteComponentProps<PathParamsType> & {
    post?: Array<postType>,
    newPostText?: string,
    addPost: () => void,
    updateNewPostText: (newText: string) => void,
    profile: profileType | null,
    match: {
        params: {
            userId: string
        }
    },
    getProfileThunkCreator: any
}

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getProfileThunkCreator(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

type profileTypeForMap = {
    profile: profileType | null
}
const mapStateToProps = (state: AppStateType): profileTypeForMap => {
    return {
        profile: state.profilePage.profile
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps,
    {
        addPost,
        updateNewPostText,
        getProfileThunkCreator
    }
)(WithUrlDataContainerComponent)

