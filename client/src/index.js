// ####
// Dette er lidt vores mother fil vores hele vores hjemmeside
// ####

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
// theme={{ colorScheme: 'light' }}

// const [colorScheme, setColorScheme] = useState('light');
// const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
// theme={{ colorScheme }}

ReactDOM.render(
    <React.StrictMode>
        {/* <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}> */}
            <MantineProvider theme={{ colorScheme: 'light' }}>
                <NotificationsProvider limit={4} position="bottom-left">
                    <BrowserRouter basename="/">
                        <App />
                    </BrowserRouter>
                </NotificationsProvider>
            </MantineProvider>
        {/* </ColorSchemeProvider> */}
    </React.StrictMode>,
    document.getElementById('root')
);
