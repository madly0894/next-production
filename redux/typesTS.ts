export type Comments = {
    body: string;
    id: string | number;
    postId: number;
};

export type Post = {
    id: number | string;
    title: string;
    body: string;
    comments: Comments[];
};

export type StateReducer = {
    posts: Post[];
    post: Post;
};

export type StateGlobal = {
    data: StateReducer;
};
