import React from 'react';
// Components
import { Button, Modal, Container, Form } from 'react-bootstrap';
import { State } from '../pages';

type Props = {
    state: State;
    handleCloseModal(): void;
    handleEdit(): void;
    handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void;
    handleChangeTextArea(e: React.ChangeEvent<HTMLTextAreaElement>): void;
};

const EditPost: React.FC<Props> = ({
    state,
    handleCloseModal,
    handleEdit,
    handleChangeInput,
    handleChangeTextArea,
}: Props) => {
    return (
        <Modal
            show={state.open}
            onHide={handleCloseModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="align-items-center">
                <Modal.Title id="contained-modal-title-vcenter">Edit Post: {state.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Title"
                                    onChange={handleChangeInput}
                                    value={state.title}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicBody">
                                <Form.Label>Body</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Body"
                                    onChange={handleChangeTextArea}
                                    required
                                    value={state.body}
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
                <Button type="button" onClick={handleEdit} disabled={!state.title || !state.body}>
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPost;
