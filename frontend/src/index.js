import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import init from './init';
import reportWebVitals from './reportWebVitals';

const app = async () => {
  const socket = io();
  const vdom = await init(socket);
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <React.StrictMode>
      {vdom}
    </React.StrictMode>,
  );
};

app();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
