import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from '@mantine/core';

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
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MantineProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
