import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import {createStore } from 'redux';

import {reducer} from "./reducers";
import App from './App';
const store = createStore(reducer);

const rootElement = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    rootElement
);
