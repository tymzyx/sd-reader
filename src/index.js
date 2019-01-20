import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/common.scss';
import './assets/svg/index';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    const eruda = require('eruda');
    eruda.init();
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
