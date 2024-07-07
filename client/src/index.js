// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
const React = require('react');
const ReactDOM = require('react-dom');
require('./index.css');
const App = require('./App.jsx');


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
