import React, {useEffect, useState, useRef} from "react";
import Layout from "../../components/Layout";
import {connect} from "react-redux";
import {get_comments, post_createComment} from "../../redux/actions/postAction";
import {useRouter} from "next/router";

type Props = {
    post: any,
    get_comments(id: number) : void,
    post_createComment(body: string, postId: number) : void
}

const PostId: React.FC<Props> = ({post, get_comments, post_createComment}) => {

    const router = useRouter();
    const {postId} = router.query;

    const [body, setBody] = useState<string>("");

    const ref = useRef<HTMLTextAreaElement>(null);

    function handleCreateComment () {
        post_createComment(body, Number(postId));
        setBody("");
    }

    function handleChange (event: React.ChangeEvent<HTMLTextAreaElement>) {
        setBody(event.target.value);
    }

    function handleKeyPress (e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            post_createComment(body, Number(postId));
            ref.current!.blur();
            setBody("");
        }
    }

    useEffect(() => {
        get_comments(Number(postId));
    }, []);

    return (
        <Layout title={`Post: ${postId}`}>
            <div className="container">
                <div className="card mx-auto">
                    <img src="/bg.jpeg" className="card-img-top" alt="..." />
                    <div className="card-body text-center">
                        <h3 className="card-title font-weight-bold text-capitalize">{post.title}</h3>
                        <p className="card-text text-muted">{post.body}</p>
                    </div>
                    <div className="card-footer">
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
                                    <button
                                        className="btn btn-sm btn-primary"
                                        type="button"
                                        onClick={handleCreateComment}
                                    >
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <h5>Comments</h5>
                        <ul className="list-group">
                            {
                                post.comments && post.comments.map(c => {
                                    return (
                                        <li key={c.id} className="list-group-item">
                                            {c.body}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>

            </div>
        </Layout>
    )
};

function mapStateToProps(state) {
    return {
        post: state.data.post
    }
}

export default connect(mapStateToProps, {get_comments, post_createComment})(PostId);