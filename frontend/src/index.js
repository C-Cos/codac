import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducer/rootReducer';
import * as serviceWorker from './serviceWorker';


const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

ReactDOM.render(
    <BrowserRouter>
        <App store={store}/>
    </BrowserRouter>

, document.getElementById('root'));

serviceWorker.unregister();
