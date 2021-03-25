import React, { useState } from 'react';
// HOC
import Router from 'next/router';
// Redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { post_createPost } from '../../redux/actions/postAction';
// Components
import Layout from '../../components/Layout';
import { Button, Form, Jumbotron } from 'react-bootstrap';

type Props = {
    post_createPost(title: string, body: string): void;
};

type State = {
    title: string;
    body: string;
};

const CreatePost: React.FC<Props> = ({ post_createPost }: Props): JSX.Element => {
    const [state, setState] = useState<State>({
        title: '',
        body: '',
    });

    const handleCreatePost = () => {
        post_createPost(state.title, state.body);
        Router.push('/');
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

    return (
        <Layout title="Create Post">
            <div className="container">
                <Jumbotron className="w-75 mx-auto mb-0">
                    <Form>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={state.title}
                                type="email"
                                placeholder="Title"
                                onChange={handleChangeInput}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicBody">
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={state.body}
                                rows={5}
                                placeholder="Body"
                                onChange={handleChangeTextArea}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button type="button" onClick={handleCreatePost}>
                                Create a new post
                            </Button>
                        </Form.Group>
                    </Form>
                </Jumbotron>
            </div>
        </Layout>
    );
};

export default compose(connect(null, { post_createPost }))(CreatePost);
