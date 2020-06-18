import * as React from "react";
import App from "next/app";
import {Provider} from "react-redux";
import {createWrapper} from "next-redux-wrapper";
import store from "../redux/store";
// style
import "../assets/css/styles.css";

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