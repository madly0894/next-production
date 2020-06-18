import React, {useState} from "react";
// HOC
import Router from "next/router";
// Redux
import {connect} from "react-redux";
import {post_createPost} from "../../redux/actions/postAction";
// Components
import Layout from "../../components/Layout";
import {Button, Form, Jumbotron} from "react-bootstrap";

type Props = {
    post_createPost(title: string, body: string) : void
}

const CreatePost: React.FC<Props> = ({post_createPost}) => {

    const [state, setState] = useState<any>({
        title: "",
        body: ""
    });

    const handleCreatePost = () => {
        post_createPost(state.title, state.body);
        Router.push("/");
    };

    const handleChangeField = (e: React.ChangeEvent<any>, key: string) => {
        setState({
            ...state,
            [key]: e.target.value
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
                                onChange={(e) => handleChangeField(e, "title")}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicBody">
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={state.body}
                                rows={5}
                                placeholder="Body"
                                onChange={(e) => handleChangeField(e, "body")}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button type="button" onClick={handleCreatePost}>Create a new post</Button>
                        </Form.Group>
                    </Form>
                </Jumbotron>
            </div>
        </Layout>
    )
};

export default connect(null, {post_createPost})(CreatePost);