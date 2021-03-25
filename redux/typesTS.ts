export type Comment = {
    body: string;
    id: string | number;
    postId: number;
};

export type CreatePost = {
    title: string;
    body: string;
};

export type UpdatePost = {
    title: string;
    body: string;
    id: number | string;
};

export type Post = {
    id: number | string;
    title: string;
    body: string;
    comments: Comment[];
};

export type Posts = Post[];

export type StateReducer = {
    posts: Post[];
    post: Post;
    loading: boolean;
};

export type StateGlobal = {
    data: StateReducer;
};
