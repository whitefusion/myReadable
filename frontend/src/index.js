import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import {BrowserRouter} from 'react-router-dom'

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
    )
)
ReactDOM.render( <Provider store={store}>
                    <BrowserRouter><App /></BrowserRouter>
                </Provider> , document.getElementById('root'));
registerServiceWorker();
