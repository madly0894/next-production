import React from 'react';
// Components
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { Jumbotron } from 'react-bootstrap';

type LayoutProps = {
    title: string;
    children?: React.ReactNode;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ children, title }: LayoutProps): JSX.Element => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* Styles */}
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <Navbar />
            <Jumbotron className="bg-dark text-center text-white rounded-0 mb-0 p-2">
                <h1 className="display-5">{title}</h1>
            </Jumbotron>
            <main className="my-4">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
