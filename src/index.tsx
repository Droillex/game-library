import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Api from "./api/api";

Api.setCredentials(
    "8wzpcv3pynyoc0djpc2bibx33lt1gj",
    "m7uvb7bhqjewm1ac9tnfcxl4xexi9w"
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
