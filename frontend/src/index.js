import React from 'react';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const vdom = init();
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
