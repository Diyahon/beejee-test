import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import History from './history.js';
import Routes from './routes';
import { AUTH_USER } from './actions/types';

import rootReducer from './reducers';

import './style/style.css';

import registerServiceWorker from './registerServiceWorker';

let store = createStore(
  rootReducer,
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

if (process.env.NODE_ENV === 'production') {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  store = createStoreWithMiddleware(rootReducer);
}

//

const token = localStorage.getItem('token');
// if we have a token, consiger the user to be signed in
if (token) {
    // we need to update application state
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router history={History}>
                <Switch>
                    <Routes />
                </Switch>
            </Router>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
