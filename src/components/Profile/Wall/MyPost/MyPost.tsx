import React from "react";
import {postType} from "../../../../Redux/state";
import {Post} from "./Post/Post";

type propsType = {
    post: Array<postType>
}

export const MyPost = (props: propsType) => {
    return (
        <div>
            {props.post.map((el: any) => <Post message={el.message} id={el.id} likesCounter={el.likesCounter}/>)}
        </div>
    )
}