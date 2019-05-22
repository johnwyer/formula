import React from 'react';
import ReactDOM from 'react-dom';
import './resources/css/bootstrap.css';
import './resources/css/styles.css';
import './resources/css/responsive.css';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const App = () => {
    return(
        <Provider store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));