import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './reducers/rootReducers';
import { createLogger } from 'redux-logger';

const initialState = {};
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        collapsed: true,
    });

    middlewares.push(logger);
}

const store = createStore(rootReducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
