import React from 'react';
/// Components
import Link from 'next/link';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer className="page-footer font-small teal bg-dark text-white fixed-bottom">
            <Container fluid className="text-center text-md-left">
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
