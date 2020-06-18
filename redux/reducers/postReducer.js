import * as types from "../types";

// export type initialStateType = {
//     posts: Array<number> | Array<string>,
//     post: object,
//     loading: boolean,
//     error: null | boolean
// };

const initialState = {
    posts: [],
    post: {}
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_POSTS:
            return {
                ...state,
                posts: action.posts
            };
        case types.REMOVE_POST:
            const newState = state.posts.filter(val => val.id !== action.index);

            return {
                ...state.posts,
                posts: newState
            };
        case types.GET_COMMENTS:
            return {
                ...state,
                post: action.post
            };
        case types.ADD_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [...state.post.comments, action.comment]
                }
            };
        default:
            return state;
    }
};