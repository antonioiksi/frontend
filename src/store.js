import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage'

import reducers from './services/reducers';

const middleware = applyMiddleware(thunk);

const enhancer = compose(
    middleware, //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    /* [middlewares] */
    persistState(/*paths, config*/),
)

/*
const store = createStore(
    reducers,
    compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);
*/
const store = createStore(reducers, enhancer);

export default store;
