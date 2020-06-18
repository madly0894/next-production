import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {get_allPosts, delete_post} from "../redux/actions/postAction";
import Layout from '../components/Layout';
import Link from "next/link";
// Styles
import styled from "styled-components";

declare var confirm: (question: string) => boolean;

type Props = {
    posts: any
    get_allPosts() : void,
    delete_post(id: number) : void
}

const Index: React.FC<Props> = ({posts, get_allPosts, delete_post}) => {

    const [state, setState] = useState<any>({
        isHovered: {}
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
            isHovered: { [id]: false }
        });
    }

    function handleEdit() {

    }

    function handleDelete(id: number) {
        const shouldRemove = confirm(`Are you sure delete ${id}`);
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
                                                    <button className="btn btn-primary mr-2">
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
                        <div className="alert alert-primary text-center" role="alert">
                            No more posts :(
                        </div>
                }
            </div>
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
        bottom: 62px;
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

function mapStateToProps(state) {
    return {
        posts: state.data.posts
    }
}

export default connect(mapStateToProps, {get_allPosts, delete_post})(Index);