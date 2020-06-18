import * as types from "../types";
// Axios
import axios from "axios";
// Api
import {API} from "../../constants";

// GET List all posts

export const get_allPosts = () => async (dispatch) => {
    try {
        const res = await axios.get(API.fetchPosts)
            .then(res => res.data)
            .catch(err => {
                console.log(err)
            });

        dispatch(dispatchFetchPosts(res));
    } catch (e) {
        throw new Error("Something went wrong with server");
    }
};

export const dispatchFetchPosts = (posts) => ({
    type: types.GET_POSTS,
    posts: posts
});

// GET Retrieve a post

export const get_comments = (id: number) => async (dispatch) => {
    try {
        const res = await axios.get(`${API.fetchPosts}${id}?_embed=comments`)
            .then(res => res.data)
            .catch(err => {
                console.log(err)
            });

        dispatch(dispatchFetchComments(res));
    } catch (e) {
        throw new Error("Something went wrong with server");
    }
};

export const dispatchFetchComments = (post) => ({
    type: types.GET_COMMENTS,
    post: post
});

// POST Create a post

export const post_createPost = (title: string, body: string) => async (dispatch) => {
    try {
        const res = await axios.post(API.fetchPosts,{
            title: title,
            body: body
        }).then(res => res.data)
            .catch(err => {
                console.log(err)
            });

        dispatch(dispatchAddPost(res));
    } catch (e) {
        throw new Error("Something went wrong with server");
    }
};

export const dispatchAddPost = (addPost) => ({
    type: types.ADD_POST,
    addPost: addPost
});

// PUT Update a post

export const put_updatePost = (id: number, title: string, body: string) => async (dispatch) => {
    try {
        const res = await axios.put(`${API.fetchPosts}${id}`,
            {
            title: title,
            body: body
        }).then(res => res.data)
            .catch(err => {
                console.log(err)
            });

        dispatch(dispatchEditPost(res));
    } catch (e) {
        throw new Error("Something went wrong with server");
    }
};

export const dispatchEditPost = (edit) => ({
    type: types.EDIT_POST,
    edit: edit
});

// DEL Delete a post

export const delete_post = (id: number) => async (dispatch) => {
    try {
        await axios.delete(`${API.fetchPosts}${id}`)
            .catch(err => {
                console.log(err)
            });

        dispatch(dispatchDeletePost(id));
    } catch (e) {
        throw new Error("Something went wrong with server");
    }
};

export const dispatchDeletePost = (index) => ({
    type: types.REMOVE_POST,
    index
});

// POST Create a comment

export const post_createComment = (body: string, postId: number) => async (dispatch) => {
    try {
        const res = await axios.post(API.fetchPostsComments,
            {
                postId: postId,
                body: body
            }).then(res => res.data)
                .catch(err => {
                    console.log(err)
                });

        dispatch(dispatchFetchComment(res));
    } catch (e) {
        throw new Error("Something went wrong with server");
    }
};

export const dispatchFetchComment = (comment) => ({
    type: types.ADD_COMMENT,
    comment: comment
});