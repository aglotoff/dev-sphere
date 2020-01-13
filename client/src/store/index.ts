import { applyMiddleware, combineReducers, createStore } from 'redux';
import {
    composeWithDevTools,
} from 'redux-devtools-extension/logOnlyInProduction';

import { apiMiddleware } from './middleware/api';
import { apiReducer } from './reducers/api';

const rootReducer = combineReducers({
    api: apiReducer,
});

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(apiMiddleware)),
);

export type AppState = ReturnType<typeof rootReducer>;
