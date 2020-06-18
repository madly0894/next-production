import * as types from "../types";
import axios from "axios";
import {API} from "../../constants";
import {REMOVE_POST} from "../types";

// GET List all posts

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

// GET Retrieve a post

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

// POST Create a post

export const post_createPost = (title, body) => async (dispatch) => {
    try {
        const res = await axios.post(API.fetchPosts,{
            title: title,
            body: body
        }).then(res => res.data);

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

export const put_updatePost = (id, title, body) => async (dispatch) => {
    try {
        const res = await axios.put(`${API.fetchPosts}${id}`,
            {
            title: title,
            body: body
        }).then(res => res.data);

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

// POST Create a comment

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