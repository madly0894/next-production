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
    loading: false,
};

export const postReducer = (state = initialState, action: any): StateReducer => {
    switch (action.type) {
        case types.GET_POSTS:
            return {
                ...state,
                posts: action.posts,
                loading: false,
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
                loading: false,
            };
        case types.REMOVE_POST:
            const newState = state.posts.filter((val) => val.id !== action.index);

            return {
                ...state,
                posts: newState,
                loading: false,
            };
        case types.GET_COMMENTS:
            return {
                ...state,
                post: action.post,
                loading: false,
            };
        case types.ADD_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [...state.post.comments, action.comment],
                },
                loading: false,
            };
        case types.SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
