import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { BrowserRouter } from "react-router-dom"
import LoginContextProvider from './context/LoginContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </BrowserRouter>
);
