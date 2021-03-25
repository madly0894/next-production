import React, { Component } from 'react';
// Redux
import { Provider } from 'react-redux';
// Components
import App from 'next/app';
// @ts-ignore
import { createWrapper } from 'next-redux-wrapper';
import store from '../redux/store';
// Styles
import '../assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    Component: any;
    pageProps: any;
};

class MyApp extends Component<Props, App> {
    render() {
        const { Component, pageProps }: Props = this.props;

        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
