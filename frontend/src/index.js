import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import reducer from './reducers'

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching',action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(logger)))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
