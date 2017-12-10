import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {thunk} from 'redux-thunk'
import {logger} from 'redux-logger'
import reducers from './reducers'

// const logger = store => next => action => {
//     console.group(action.type)
//     console.info('dispatching',action)
//     let result = next(action)
//     console.log('next state', store.getState())
//     console.groupEnd(action.type)
//     return result
// }

const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk,logger)))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
