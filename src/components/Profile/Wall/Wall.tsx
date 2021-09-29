import React, {ChangeEvent, KeyboardEvent} from 'react';
import classes from './Wall.module.css'
import {MyPost} from "./MyPost/MyPost";
import {profilePageType} from "../../../Redux/store";

type WallPropsType = {
    profilePage: profilePageType
    updateNewPostText: (text: string) => void
    addPost: () => void
}
export const Wall = (props: WallPropsType) => {
    const onAddPost = () => {
        props.addPost()
    }
    const addNewPostHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addPost()
        }
    }
    return (
        <div className={classes.wall}>
            <div className={classes.mainInput}>
                <div className={classes.miniAva}>
                    <img
                        src="https://pristor.ru/wp-content/uploads/2020/03/%D0%90%D0%B2%D0%B0-%D0%B2-%D0%B2%D0%BA-%D0%B2-%D0%BE%D1%82%D0%BF%D1%83%D1%81%D0%BA%D0%B5-%D0%BE%D1%87%D0%B5%D0%BD%D1%8C-%D0%BF%D1%80%D0%B8%D0%BA%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-2.jpg"
                        alt=""/>
                </div>
                <div className={classes.input}>
                    <input type="Поделись новостью" size={40}
                           value={props.profilePage.newPostText}
                           onChange={addNewPostHandler}
                           onKeyPress={onKeyPressHandler}
                    />
                    <input type="button" value="Publish"
                           onClick={onAddPost}
                           className={classes.button}/>
                </div>
            </div>
            <MyPost post={props.profilePage.post}/>
        </div>
    )
}