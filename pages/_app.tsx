import React, { Component } from 'react';
// Redux
import { Provider } from 'react-redux';
// Components
// @ts-ignore
import { createWrapper } from 'next-redux-wrapper';
import store from '../redux/store';
// Styles
import '../assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore
import App, { AppProps } from 'next/app';

class MyApp extends Component<AppProps, App> {
    render() {
        const { Component, pageProps }: AppProps = this.props;

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
