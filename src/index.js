import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './Components';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import * as reducers from './Reducers';
import * as firebase from "firebase";

//initialize firebase
var config = {
    databaseURL: "https://word-game-83312.firebaseio.com/"
};
firebase.initializeApp(config);


//initialize store
const store = createStore(
    combineReducers(Object.assign({}, reducers))
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();