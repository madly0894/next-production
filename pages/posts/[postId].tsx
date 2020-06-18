import React, {useEffect, useState, useRef} from "react";
// Hoc
import {useRouter} from "next/router";
// Redux
import {connect} from "react-redux";
import {compose} from "redux";
import {get_comments, post_createComment} from "../../redux/actions/postAction";
// Components
import Layout from "../../components/Layout";
import {Button, Card, ListGroup} from "react-bootstrap";

type Props = {
    post: any,
    get_comments(id: number) : void,
    post_createComment(body: string, postId: number) : void
};

const PostId: React.FC<Props> = ({post, get_comments, post_createComment}) => {

    const router = useRouter();
    const {postId} = router.query;

    const [body, setBody] = useState<string>("");

    const ref = useRef<HTMLTextAreaElement>(null);

    const handleCreateComment = () => {
        post_createComment(body, Number(postId));
        setBody("");
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            post_createComment(body, Number(postId));
            ref.current!.blur();
            setBody("");
        }
    };

    useEffect(() => {
        get_comments(Number(postId));
    }, []);

    return (
        <Layout title={`Post: ${postId}`}>
            <div className="container">
                <Card className="card mx-auto">
                    <Card.Img variant="top" src="/bg.jpeg" />
                    <Card.Body className="text-center">
                        <Card.Title className="font-weight-bold text-capitalize">{post && post.title}</Card.Title>
                        <Card.Text className="text-muted">{post && post.body}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className="panel mt-3">
                            <div className="panel-body">
                                <textarea
                                    className="form-control"
                                    placeholder="What are you thinking?"
                                    rows={2}
                                    ref={ref}
                                    value={body}
                                    onChange={e => handleChange(e)}
                                    onKeyPress={e => handleKeyPress(e)}
                                />
                                <div className="text-right mt-3">
                                    <Button
                                        size="sm"
                                        type="button"
                                        onClick={handleCreateComment}
                                    >
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <h5>Comments</h5>
                        <ListGroup variant="flush">
                            {
                                post && post.comments && post.comments.map(c => {
                                    return (
                                        <ListGroup.Item key={c.id}>
                                            {c && c.body}
                                        </ListGroup.Item>
                                    );
                                })
                            }
                        </ListGroup>
                    </Card.Footer>
                </Card>

            </div>
        </Layout>
    )
};

// PostId.getInitialProps = async () => {return {}};

function mapStateToProps(state) {
    return {
        post: state.data.post
    }
}

export default compose(connect(mapStateToProps, {get_comments, post_createComment}))(PostId);