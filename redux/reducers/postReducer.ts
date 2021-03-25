import * as types from '../types';
import { StateReducer } from '../typesTS';

const initialState: StateReducer = {
    posts: [],
    post: {
        id: '',
        title: '',
        body: '',
        comments: [],
    },
};

export const postReducer = (state: StateReducer = initialState, action) => {
    switch (action.type) {
        case types.GET_POSTS:
            return {
                ...state,
                posts: action.posts,
            };
        case types.ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.addPost],
            };
        case types.EDIT_POST:
            const editPost = state.posts.map((todo) =>
                todo.id === action.edit.id ? { ...todo, ...action.edit } : todo,
            );

            return {
                ...state,
                posts: editPost,
            };
        case types.REMOVE_POST:
            const newState = state.posts.filter((val) => val.id !== action.index);

            return {
                ...state.posts,
                posts: newState,
            };
        case types.GET_COMMENTS:
            return {
                ...state,
                post: action.post,
            };
        case types.ADD_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [...state.post.comments, action.comment],
                },
            };
        default:
            return state;
    }
};
