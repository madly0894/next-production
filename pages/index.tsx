import React, {useEffect, useState} from 'react';
// Redux
import {connect} from "react-redux";
import {compose} from "redux";
import {get_allPosts, delete_post, put_updatePost} from "../redux/actions/postAction";
// Components
import Layout from '../components/Layout';
import EditPost from "../components/EditPost";
import Link from "next/link";
import {Alert} from "react-bootstrap";
// Styles
import styled from "styled-components";

declare var confirm: (question: string) => boolean;

type Props = {
    posts: any
    get_allPosts() : void,
    delete_post(id: number) : void,
    put_updatePost(id: number, title: string, body: string) : void
}

const Index: React.FC<Props> = ({posts, get_allPosts, delete_post, put_updatePost}) => {

    const [state, setState] = useState<any>({
        isHovered: {},
        open: false,
        id: "",
        title: "",
        body: ""
    });

    useEffect(() => {
        get_allPosts();
    }, []);

    function handleMouseEnter(id: number) {
        setState({
            isHovered: { [id]: true }
        });
    }

    function handleMouseLeave(id: number) {
        setState( {
            ...state,
            isHovered: { [id]: false }
        });
    }

    const handleOpenModal = (id: number) => {
        setState({
            ...state,
            open: true,
            id: id
        });
    };

    const handleCloseModal = () => {
        setState({
            ...state,
            open: false
        });
    };

    const handleChangeFields = (val: React.ChangeEvent<any>, key: string) => {
        setState({
            ...state,
            [key]: val
        });
    };

    const handleEdit = () => {
        setState({
            ...state,
            open: false
        });
        put_updatePost(state.id, state.title, state.body);
    };

    function handleDelete(id: number) {
        const shouldRemove = confirm(`Are you sure delete post: ${id}?`);
        if(shouldRemove) {
            delete_post(id);
        }
    }

    return (
        <Layout title="Latest Posts">
            <div className="container">
                {
                    posts.length ?
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                            {
                                posts && posts.map(p => {
                                    return (
                                        <div className="col mb-4" key={p.id}>
                                            <div className="card">
                                                <Link href="/posts/[postId]" as={`/posts/${p.id}`}>
                                                    <a className="text-decoration-none">
                                                        <CardBox
                                                            onMouseEnter={() => handleMouseEnter(p.id)}
                                                            onMouseLeave={() => handleMouseLeave(p.id)}
                                                        >
                                                            <CardOverlay isHovered={state.isHovered[p.id]}>
                                                                <span>Read More</span>
                                                            </CardOverlay>
                                                            <img src="/bg.jpeg" className="card-img-top" alt="..." />
                                                            <div className="card-body">
                                                                <h3 className="card-title font-weight-bold text-dark text-capitalize">{p.title}</h3>
                                                                <p className="card-text text-muted">{p.body}</p>
                                                            </div>
                                                        </CardBox>
                                                    </a>
                                                </Link>
                                                <div className="card-footer">
                                                    <button
                                                        className="btn btn-primary mr-2"
                                                        onClick={() => handleOpenModal(p.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(p.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        :
                        <Alert variant="primary" className="text-center">
                            No more posts :(. <Link href="/posts/new"><a>Create a new post</a></Link>
                        </Alert>
                }
            </div>
            <EditPost
                open={state.open}
                postId={state.id}
                handleCloseModal={handleCloseModal}
                handleEdit={handleEdit}
                handleChangeFields={handleChangeFields}
            />
        </Layout>
    )
};

const CardBox = styled.div.attrs({
    className: "app-card-box"
})`
    &.app-card {
        position: relative;
    }
`;

const CardOverlay = styled.div.attrs({
    className: "app-card-overlay"
})`
    &.app-card-overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        opacity: ${props => props.isHovered ? 1 : 0};
        background: ${props => props.isHovered ? "rgba(0, 0, 0, .5)" : "none"};
        transition: all .3s;
        top: 0;
        left: 0;
        right: 0;
        bottom: 63px;
        cursor: pointer;
        span {
            color: #fff;
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, .5);
            background-color: rgba(0, 0, 0, .5);
            border-radius: 10px;
        }
    }
`;

function mapStateToProps(state: any) {
    return {
        posts: state.data.posts
    }
}

export default compose(connect(mapStateToProps, {get_allPosts, delete_post, put_updatePost}))(Index);