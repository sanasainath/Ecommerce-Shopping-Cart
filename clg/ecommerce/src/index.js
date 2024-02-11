import React from 'react';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'


const root = ReactDOM.createRoot(document.getElementById('root'));

window.store=store;
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
