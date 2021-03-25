import * as types from '../types';
// Axios
import axios from 'axios';
// Api
import { API } from '../../constants';
import { ThunkAction } from 'redux-thunk';
import { Post, Posts, CreatePost, UpdatePost, Comment } from '../typesTS';

// GET List all posts

type ThunkType = ThunkAction<Promise<void>, any, any, any>;

export const get_allPosts = (): ThunkType => async (dispatch) => {
    dispatch(setLoading());
    try {
        const res = await axios
            .get(API.fetchPosts)
            .then((res) => res.data)
            .catch((err) => {
                console.log(err);
            });

        dispatch(dispatchFetchPosts(res));
    } catch (e) {
        throw new Error('Something went wrong with server');
    }
};

type GetPosts = {
    type: typeof types.GET_POSTS;
    posts: Posts;
};

export const dispatchFetchPosts = (posts: Posts): GetPosts => ({
    type: types.GET_POSTS,
    posts: posts,
});

// GET Retrieve a post

export const get_comments = (id: number): ThunkType => async (dispatch) => {
    dispatch(setLoading());
    try {
        const res = await axios
            .get(`${API.fetchPosts}${id}?_embed=comments`)
            .then((res) => res.data)
            .catch((err) => {
                console.log(err);
            });

        dispatch(dispatchFetchComments(res));
    } catch (e) {
        throw new Error('Something went wrong with server');
    }
};

type GetComments = {
    type: typeof types.GET_COMMENTS;
    post: Post;
};

export const dispatchFetchComments = (post: Post): GetComments => ({
    type: types.GET_COMMENTS,
    post,
});

// POST Create a post

export const post_createPost = (title: string, body: string): ThunkType => async (dispatch) => {
    dispatch(setLoading());
    try {
        const res = await axios
            .post(API.fetchPosts, {
                title: title,
                body: body,
            })
            .then((res) => res.data)
            .catch((err) => {
                console.log(err);
            });

        dispatch(dispatchAddPost(res));
    } catch (e) {
        throw new Error('Something went wrong with server');
    }
};

type AddPost = {
    type: typeof types.ADD_POST;
    addPost: CreatePost;
};

export const dispatchAddPost = (addPost: CreatePost): AddPost => ({
    type: types.ADD_POST,
    addPost,
});

// PUT Update a post

export const put_updatePost = (id: number, title: string, body: string): ThunkType => async (dispatch) => {
    dispatch(setLoading());
    try {
        const res = await axios
            .put(`${API.fetchPosts}${id}`, {
                title: title,
                body: body,
            })
            .then((res) => res.data)
            .catch((err) => {
                console.log(err);
            });

        dispatch(dispatchEditPost(res));
    } catch (e) {
        throw new Error('Something went wrong with server');
    }
};

type EditPost = {
    type: typeof types.EDIT_POST;
    edit: UpdatePost;
};

export const dispatchEditPost = (edit: UpdatePost): EditPost => ({
    type: types.EDIT_POST,
    edit,
});

// DEL Delete a post

export const delete_post = (id: number): ThunkType => async (dispatch) => {
    dispatch(setLoading());
    try {
        await axios.delete(`${API.fetchPosts}${id}`).catch((err) => {
            console.log(err);
        });

        dispatch(dispatchDeletePost(id));
    } catch (e) {
        throw new Error('Something went wrong with server');
    }
};

type DeletePost = {
    type: typeof types.REMOVE_POST;
    index: number;
};

export const dispatchDeletePost = (index: number): DeletePost => ({
    type: types.REMOVE_POST,
    index,
});

// POST Create a comment

export const post_createComment = (body: string, postId: number): ThunkType => async (dispatch) => {
    dispatch(setLoading());
    try {
        const res = await axios
            .post(API.fetchPostsComments, {
                postId: postId,
                body: body,
            })
            .then((res) => res.data)
            .catch((err) => {
                console.log(err);
            });

        dispatch(dispatchFetchComment(res));
    } catch (e) {
        throw new Error('Something went wrong with server');
    }
};

type FetchComment = {
    type: typeof types.ADD_COMMENT;
    comment: Comment;
};

export const dispatchFetchComment = (comment: Comment): FetchComment => ({
    type: types.ADD_COMMENT,
    comment,
});

export const setLoading = () => ({
    type: types.SET_LOADING,
});
