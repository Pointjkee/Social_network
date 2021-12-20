import React from "react";
import {postType} from "../../../../Redux/store";
import {Post} from "./Post/Post";

type propsType = {
    post: Array<postType>
}

export const MyPost = React.memo((props: propsType) => {
    return (
        <div>
            {props.post.map((el: postType) =>
                <Post message={el.message}
                      id={el.id}
                      likesCounter={el.likesCounter}/>)}
        </div>
    )
})