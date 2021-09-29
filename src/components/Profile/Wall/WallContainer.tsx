import React from 'react';
import {storeType} from "../../../Redux/store";
import {addNewPostHandlerActionCreater, addPostActionCreater} from '../../../Redux/profilePage-reducer';
import {Wall} from "./Wall";

type WallContainerPropsType = {
    store: storeType
}
export const WallContainer = (props: WallContainerPropsType) => {
    const addPost = () => {
        props.store.dispatch(addPostActionCreater(props.store.getState().profilePage.newPostText))
    }
    const addNewPostHandler = (text: string) => {
        props.store.dispatch(addNewPostHandlerActionCreater(text))
    }
    return (
        <Wall
            profilePage={props.store.getState().profilePage}
            updateNewPostText={addNewPostHandler}
            addPost={addPost}
        />
    )
}