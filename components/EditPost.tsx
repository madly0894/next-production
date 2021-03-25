import React from 'react';
// Components
import { Button, Modal, Container, Form } from 'react-bootstrap';

type Props = {
    open: boolean;
    postId: number | string;
    handleCloseModal(): void;
    handleEdit(): void;
    handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void;
    handleChangeTextArea(e: React.ChangeEvent<HTMLTextAreaElement>): void;
};

const EditPost: React.FC<Props> = ({
    postId,
    open,
    handleCloseModal,
    handleEdit,
    handleChangeInput,
    handleChangeTextArea,
}: Props) => {
    return (
        <Modal show={open} onHide={handleCloseModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit Post: {postId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="email" placeholder="Title" onChange={handleChangeInput} />
                            </Form.Group>
                            <Form.Group controlId="formBasicBody">
                                <Form.Label>Body</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Body"
                                    onChange={handleChangeTextArea}
                                />
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" className="btn-secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button type="button" onClick={handleEdit}>
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPost;
