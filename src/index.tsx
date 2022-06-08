import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Api from "./api/api";

Api.setCredentials(
    "lnb5i5tshcvdjtpxb39d1ltcil43dj",
    "glk5fmyzru9gh1f42zsbqwqymno9nn"
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
