import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { DeviceThemeProvider } from '@salutejs/plasma-ui/components/Device/index.js'; // Типографика, имеющая размеры, зависимые от типа устройства
import { GlobalStyle } from './GlobalStyle.jsx'; // Тема оформления (цветовая схема)
import{create_base_user} from "./data/data.js"
if(!localStorage.getItem('user')) {create_base_user()} 
//const app =express();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <DeviceThemeProvider>
        <GlobalStyle />
        <App id ="child" className="scrollbar" style ={{ overflowY: 'scroll'}}/>
    </DeviceThemeProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
