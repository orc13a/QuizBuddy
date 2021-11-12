import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

// const getTheme = () => {
//     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//         return 'dark';
//     } else {
//         return 'light';
//     }
// }

ReactDOM.render(
    <React.StrictMode>
        <MantineProvider theme={{ colorScheme: 'light' }}>
            <NotificationsProvider position="bottom-left">
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </NotificationsProvider>
        </MantineProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
