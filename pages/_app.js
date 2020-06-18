import React from "react";
// Redux
import {Provider} from "react-redux";
// Components
import App from "next/app";
import {createWrapper} from "next-redux-wrapper";
import store from "../redux/store";
// Styles
import "../assets/css/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class MyApp extends App {
    render() {

        const {Component, pageProps} = this.props;

        return (
            <Provider store={store}>
                <Component {...pageProps}/>
            </Provider>
        );
    }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);