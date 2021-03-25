import React, { useEffect, useState, useRef } from 'react';
// Hoc
// @ts-ignore
import { useRouter } from 'next/router';
// @ts-ignore
import { GetServerSideProps, NextPage } from 'next';
// Redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { get_comments, post_createComment } from '../../redux/actions/postAction';
// Components
import Layout from '../../components/Layout';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Post, StateGlobal } from '../../redux/typesTS';
import Loading from '../../components/Loading';

type Props = {
    post: Post;
    loading: boolean;
    get_comments(id: number): void;
    post_createComment(body: string, postId: number): void;
};

const PostId: NextPage<Props> = ({ post, loading, get_comments, post_createComment }: Props): JSX.Element => {
    const router = useRouter();
    const { postId } = router.query;

    const [body, setBody] = useState<string>('');

    const ref = useRef<HTMLTextAreaElement>(null);

    const handleCreateComment = () => {
        post_createComment(body, Number(postId));
        setBody('');
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {
            target: { value },
        } = event;

        setBody(value);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            post_createComment(body, Number(postId));
            ref.current?.blur();
            setBody('');
        }
    };

    useEffect(() => {
        get_comments(Number(postId));
    }, [postId]);

    return (
        <Layout title={`Post: ${postId}`}>
            <div className="container">
                {loading ? (
                    <Loading />
                ) : (
                    <Card className="card mx-auto">
                        <Card.Img variant="top" src="/bg.jpeg" />
                        <Card.Body className="text-center">
                            <Card.Title className="font-weight-bold text-capitalize">{post?.title}</Card.Title>
                            <Card.Text className="text-muted">{post?.body}</Card.Text>
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
                                        onChange={handleChange}
                                        onKeyPress={handleKeyPress}
                                        required
                                    />
                                    <div className="text-right mt-3">
                                        <Button size="sm" type="button" onClick={handleCreateComment}>
                                            Share
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <h5>Comments</h5>
                            <ListGroup variant="flush">
                                {post?.comments?.map((c) => {
                                    return <ListGroup.Item key={c.id}>{c?.body}</ListGroup.Item>;
                                })}
                            </ListGroup>
                        </Card.Footer>
                    </Card>
                )}
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return { props: { query } };
};

function mapStateToProps({ data }: StateGlobal) {
    return {
        post: data.post,
        loading: data.loading,
    };
}

export default compose(connect(mapStateToProps, { get_comments, post_createComment }))(PostId);
