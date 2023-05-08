import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DeviceThemeProvider } from '@salutejs/plasma-ui/components/Device'; // Типографика, имеющая размеры, зависимые от типа устройства
import { GlobalStyle } from './GlobalStyle'; // Тема оформления (цветовая схема)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <DeviceThemeProvider>
        <GlobalStyle />
        <App id ="child"/>
    </DeviceThemeProvider>
    </BrowserRouter>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
