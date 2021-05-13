import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthProvider from './provider/AuthProvider'
import {BrowserRouter} from 'react-router-dom'
ReactDOM.render(
<BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
</BrowserRouter>
, document.getElementById('root'));

//  change
// unregister() to register() below to make app faster. Note: super not recommended.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
