import React, { useEffect, useState } from 'react';
// Redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { get_allPosts, delete_post, put_updatePost } from '../redux/actions/postAction';
// Components
import Layout from '../components/Layout';
import EditPost from '../components/EditPost';
import Link from 'next/link';
import { Alert } from 'react-bootstrap';
// Styles
import styled from 'styled-components';
import { Post, StateGlobal } from '../redux/typesTS';
import Loading from '../components/Loading';

declare let confirm: (question: string) => boolean;

type Props = {
    posts: Post[];
    loading: boolean;
    get_allPosts(): void;
    delete_post(id: number | string): void;
    put_updatePost(id: number | string, title: string, body: string): void;
};

type State = {
    open: boolean;
    id: number | string;
    title: string;
    body: string;
    isHovered: number | string | null;
};

const Index: React.FC<Props> = ({ posts, loading, get_allPosts, delete_post, put_updatePost }: Props): JSX.Element => {
    const [state, setState] = useState<State>({
        isHovered: null,
        open: false,
        id: '',
        title: '',
        body: '',
    });

    useEffect(() => {
        get_allPosts();
    }, []);

    function handleMouseEnter(id: number | string) {
        setState((prevState: State) => ({
            ...prevState,
            isHovered: id,
        }));
    }

    function handleMouseLeave() {
        setState((prevState) => ({
            ...prevState,
            isHovered: null,
        }));
    }

    const handleOpenModal = (id: number | string) => {
        setState({
            ...state,
            open: true,
            id: id,
        });
    };

    const handleCloseModal = () => {
        setState({
            ...state,
            open: false,
        });
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;

        setState({
            ...state,
            title: value,
        });
    };

    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {
            target: { value },
        } = e;

        setState({
            ...state,
            body: value,
        });
    };

    const handleEdit = () => {
        setState({
            ...state,
            open: false,
        });
        put_updatePost(state.id, state.title, state.body);
    };

    function handleDelete(id: number | string) {
        const shouldRemove = confirm(`Are you sure delete post: ${id}?`);
        if (shouldRemove) {
            delete_post(id);
        }
    }

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [loading]);

    return (
        <Layout title="Latest Posts">
            <div className="container">
                {loading && <Loading />}

                {!loading && posts.length === 0 ? (
                    <Alert variant="primary" className="text-center">
                        No more posts :(.{' '}
                        <Link href="/posts/new">
                            <a>Create a new post</a>
                        </Link>
                    </Alert>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        {posts?.map((p) => {
                            return (
                                <div className="col mb-4" key={p.id}>
                                    <div className="card">
                                        <Link href="/posts/[postId]" as={`/posts/${p.id}`}>
                                            <a className="text-decoration-none">
                                                <CardBox
                                                    onMouseEnter={() => handleMouseEnter(p.id)}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    <CardOverlay isHovered={state.isHovered === p.id}>
                                                        <span>Read More</span>
                                                    </CardOverlay>
                                                    <img src="/bg.jpeg" className="card-img-top" alt="..." />
                                                </CardBox>
                                            </a>
                                        </Link>
                                        <div className="card-body" style={{ height: 200, overflow: 'auto' }}>
                                            <h3 className="card-title font-weight-bold text-dark text-capitalize">
                                                {p.title}
                                            </h3>
                                            <p className="card-text text-muted">{p.body}</p>
                                        </div>
                                        <div className="card-footer">
                                            <button
                                                className="btn btn-primary mr-2"
                                                onClick={() => handleOpenModal(p.id)}
                                            >
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <EditPost
                open={state.open}
                postId={state.id}
                handleCloseModal={handleCloseModal}
                handleEdit={handleEdit}
                handleChangeInput={handleChangeInput}
                handleChangeTextArea={handleChangeTextArea}
            />
        </Layout>
    );
};

const CardBox = styled.div.attrs({
    className: 'app-card-box',
})`
    &.app-card {
        position: relative;
    }
`;

const CardOverlay = styled.div.attrs({
    className: 'app-card-overlay',
})`
    &.app-card-overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        opacity: ${(props) => (props.isHovered ? 1 : 0)};
        background: ${(props) => (props.isHovered ? 'rgba(0, 0, 0, .5)' : 'none')};
        transition: all 0.3s;
        top: 0;
        left: 0;
        right: 0;
        bottom: 263px;
        cursor: pointer;
        span {
            color: #fff;
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.5);
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 10px;
        }
    }
`;

function mapStateToProps({ data }: StateGlobal) {
    return {
        posts: data.posts,
        loading: data.loading,
    };
}

export default compose(connect(mapStateToProps, { get_allPosts, delete_post, put_updatePost }))(Index);
