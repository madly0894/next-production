import React, { useState } from 'react';
// Components
import Link from 'next/link';
import { Nav, Navbar as Header } from 'react-bootstrap';
// Styles
import styled from 'styled-components';
import ActiveLink from './ActiveLink';

const Navbar: React.FC = (): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    function onOpen() {
        setOpen(!open);
    }

    function onClose() {
        setOpen(false);
    }

    return (
        <header>
            <Header expand="md" bg="dark" variant="dark">
                <Link href="/">
                    <a className="navbar-brand">Blog</a>
                </Link>
                <CollapseButton onClick={onOpen} className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon" />
                </CollapseButton>
                <CollapseMenuOverlay open={open} onClick={onClose} />
                <CollapseMenu open={open} onClick={(e) => e.stopPropagation()} className="collapse navbar-collapse">
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <ActiveLink activeClassName="active" href="/">
                                <a className="nav-link">Latest Posts</a>
                            </ActiveLink>
                        </Nav.Item>
                        <Nav.Item>
                            <ActiveLink activeClassName="active" href="/posts/new">
                                <a className="nav-link">Create Post</a>
                            </ActiveLink>
                        </Nav.Item>
                    </Nav>
                </CollapseMenu>
            </Header>
        </header>
    );
};

const CollapseButton = styled.button`
    display: none !important;
    @media (max-width: 768px) {
        display: block !important;
    }
`;

const CollapseMenuOverlay = styled.div`
    opacity: 0;
    visibility: hidden;
    @media (max-width: 768px) {
        visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
        opacity: ${(props) => (props.open ? '1' : 0)};
        transition: all 0.3s;
        position: fixed;
        height: 100%;
        width: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
`;

const CollapseMenu = styled.div`
    display: block !important;
    @media (max-width: 768px) {
        position: fixed;
        align-items: flex-start;
        top: 0;
        bottom: 0;
        height: 100%;
        z-index: 9999;
        background-color: #343a40;
        width: 70%;
        left: ${(props) => (props.open ? '0' : '-100%')};
        transition: all 0.3s;
        .navbar-nav {
            width: 100%;
            margin-left: 0 !important;
            .nav-item {
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                .nav-link {
                    text-align: center;
                }
            }
        }
    }
`;

export default Navbar;
