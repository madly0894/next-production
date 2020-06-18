import * as types from "../types";
import axios from "axios";
import {API} from "../../constants";
import {REMOVE_POST} from "../types";

export const get_allPosts = () => async (dispatch) => {
    try {
        const res = await axios.get(API.fetchPosts)
            .then(res => res.data);

        dispatch(dispatchFetchPosts(res));
    } catch (e) {
        throw new Error("Something went wrong with server");
    }
};

export const dispatchFetchPosts = (posts) => ({
    type: types.GET_POSTS,
    posts: posts
});

export const get_comments = (id = null) => async (dispatch) => {
    try {
        const res = await axios.get(`${API.fetchPosts}${id}?_embed=comments`)
            .then(res => res.data);

        dispatch(dispatchFetchComments(res));
    } catch (e) {
        throw new Error("Something went wrong with server");
    }
};

export const dispatchFetchComments = (post) => ({
    type: types.GET_COMMENTS,
    post: post
});

export const post_createComment = (body = null, postId = null) => async (dispatch) => {
    try {
        const res = await axios.post(API.fetchPostsComments,
            {
                postId: postId,
                body: body
        }).then(res => res.data);

        dispatch(dispatchFetchComment(res));
    } catch (e) {
        throw new Error("Something went wrong with server");
    }
};

export const dispatchFetchComment = (comment) => ({
    type: types.ADD_COMMENT,
    comment: comment
});

//
// export const post_createPost = (state = null) => async (dispatch) => {
//     try {
//         const res = await axios.post(API.fetchPosts,{
//             title: state.title,
//             body: state.body
//         }).then(res => res.data);
//
//         dispatch(dispatchFetchPosts(res));
//     } catch (e) {
//         throw new Error("Something went wrong with server");
//     }
// };
//
// export const put_updatePost = (state = null) => async (dispatch) => {
//     try {
//         const res = await axios.put(`${API.fetchPosts}${state.id}`,
//             {
//             title: state.title,
//             body: state.body
//         }).then(res => res.data);
//
//         dispatch(dispatchFetchPosts(res));
//     } catch (e) {
//         throw new Error("Something went wrong with server");
//     }
// };
//
export const delete_post = (id = null) => async (dispatch) => {
    try {
        await axios.delete(`${API.fetchPosts}${id}`);

        dispatch(dispatchDeletePost(id));
    } catch (e) {
        throw new Error("Something went wrong with server");
    }
};

export const dispatchDeletePost = (index) => ({
    type: REMOVE_POST,
    index
});
