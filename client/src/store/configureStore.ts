/**
 * @file Store configuration.
 * @author Andrey Glotov
 */

import {
    applyMiddleware,
    createStore,
} from 'redux';
import {
    composeWithDevTools,
} from 'redux-devtools-extension/logOnlyInProduction';

import { apiMiddleware } from './middleware/api';
import rootReducer from './reducers/root';

/**
 * Configure the application store.
 *
 * @return The store.
 */
export default function configureStore() {
    const composeEnhancers = composeWithDevTools({});
    return  createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(apiMiddleware)),
    );
}
