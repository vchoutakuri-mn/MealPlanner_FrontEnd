import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Favicon from 'react-favicon';
import WindowFocusHandler from './components/HomeFolder/FocusHandler';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <WindowFocusHandler/>
  </React.StrictMode>,
  document.getElementById('root')
);
// vishnu this is additional

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
