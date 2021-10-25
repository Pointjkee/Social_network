import React from 'react';
import {Profile} from "./Profile";
import {postType, profileType} from "../../Redux/store";
import {connect} from "react-redux";
import {addPost, setUserProfile, updateNewPostText} from "../../Redux/profilePage-reducer";
import { AppStateType } from '../../Redux/storeRedux';
const {default: axios} = require('axios');


type responseType = {
    data: profileType
}
type ProfilePropsType = {
    post?: Array<postType>,
    newPostText?: string,
    addPost: () => void,
    updateNewPostText: (newText: string) => void,
    setUserProfile: (profile:any) => void,
    profile:profileType | null,
}

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)                     //ajax-запрос
            .then((response: responseType) => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}
type profileTypeForMap = {
    profile:profileType | null
}
const mapStateToProps = (state: AppStateType):profileTypeForMap  => {
   return {
       profile: state.profilePage.profile
   }
}

export default connect(mapStateToProps,
    {
    addPost,
    updateNewPostText,
    setUserProfile,
}
)(ProfileContainer)

