import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AppShell, MantineProvider } from '@mantine/core';
ReactDOM.render(
    <React.StrictMode>
        <MantineProvider theme={{ colorScheme: 'light' }}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MantineProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
