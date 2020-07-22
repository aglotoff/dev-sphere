/* eslint-disable no-underscore-dangle */
import 'core-js/features/promise';
import 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';
import { rehydrateMarks } from 'react-imported-component';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './imported';

import { App } from './components/layout/App';
import configureStore from './store/configureStore';
import { AppState } from './store/reducers/root';

declare global {
    interface Window { __PRELOADED_STATE__?: AppState }
}

const preloadedState = window.__PRELOADED_STATE__;

if (preloadedState) {
    delete window.__PRELOADED_STATE__;
}

const store = configureStore(preloadedState);

rehydrateMarks().then(() => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root'),
    );
});
