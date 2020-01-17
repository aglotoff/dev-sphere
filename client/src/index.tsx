import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './assets/fonts/Metropolis-Bold.woff';
import './assets/fonts/Metropolis-Bold.woff2';
import './assets/fonts/Metropolis-Medium.woff';
import './assets/fonts/Metropolis-Medium.woff2';
import './assets/fonts/Metropolis-Regular.woff';
import './assets/fonts/Metropolis-Regular.woff2';
import './assets/fonts/Metropolis-SemiBold.woff';
import './assets/fonts/Metropolis-SemiBold.woff2';

import './assets/styles/main.scss';

import App from './components/common/App/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
