import React from 'react';
import Head from 'next/head';
import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
    title?: string
};

const Layout: React.FunctionComponent<LayoutProps> = ({ children, title }) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            {/* Styles */}
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
        </Head>
        <Navbar/>
        <div className="jumbotron bg-dark text-center text-white rounded-0 mb-0">
            <h1 className="display-4">{title}</h1>
        </div>
        <main className="my-4">
            {children}
        </main>
        <Footer/>
    </div>
);

export default Layout;