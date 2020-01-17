import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './fonts/Metropolis-Bold.woff';
import './fonts/Metropolis-Bold.woff2';
import './fonts/Metropolis-Medium.woff';
import './fonts/Metropolis-Medium.woff2';
import './fonts/Metropolis-Regular.woff';
import './fonts/Metropolis-Regular.woff2';
import './fonts/Metropolis-SemiBold.woff';
import './fonts/Metropolis-SemiBold.woff2';

import './styles/main.scss';

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
