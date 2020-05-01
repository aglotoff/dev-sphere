/**
 * @file Client application entry point.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Font Imports
import './assets/fonts/Metropolis-Bold.woff';
import './assets/fonts/Metropolis-Bold.woff2';
import './assets/fonts/Metropolis-Medium.woff';
import './assets/fonts/Metropolis-Medium.woff2';
import './assets/fonts/Metropolis-Regular.woff';
import './assets/fonts/Metropolis-Regular.woff2';
import './assets/fonts/Metropolis-SemiBold.woff';
import './assets/fonts/Metropolis-SemiBold.woff2';

// Global CSS Imports
import './assets/styles/main.scss';

// App Imports
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';

// UI Imports
import { App } from './components/layout/App';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();
