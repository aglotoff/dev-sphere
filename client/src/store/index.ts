import { applyMiddleware, combineReducers, createStore } from 'redux';
import {
    composeWithDevTools,
} from 'redux-devtools-extension/logOnlyInProduction';

import { apiMiddleware } from './api/middleware';
import { apiReducer } from './api/reducers';
import { authReducer } from './auth/reducers';

const rootReducer = combineReducers({
    api: apiReducer,
    auth: authReducer,
});

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(apiMiddleware)),
);

store.subscribe(() => {
    localStorage.setItem('loggedIn', String(store.getState().auth.loggedIn));
});

export type AppState = ReturnType<typeof rootReducer>;
