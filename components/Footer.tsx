import React from 'react';
/// Components
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer className="page-footer font-small teal pt-4 bg-dark text-white">
            <Container fluid className="text-center text-md-left">
                <Row>
                    <Col md={6} className="mt-md-0 mt-3">
                        <h5 className="text-uppercase font-weight-bold">Footer text 1</h5>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita sapiente sint, nulla,
                            nihil repudiandae commodi voluptatibus corrupti animi sequi aliquid magnam debitis, maxime
                            quam recusandae harum esse fugiat. Itaque, culpa?
                        </p>
                    </Col>
                    <Col md={6} className="mb-md-0 mb-3">
                        <h5 className="text-uppercase font-weight-bold">Footer text 2</h5>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio deserunt fuga perferendis
                            modi earum commodi aperiam temporibus quod nulla nesciunt aliquid debitis ullam omnis quos
                            ipsam, aspernatur id excepturi hic.
                        </p>
                    </Col>
                </Row>
                <div className="footer-copyright py-3 text-center text-md-left">
                    © 2020 Copyright:&nbsp;
                    <Link href="/">
                        <a className="text-muted">Blog</a>
                    </Link>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
