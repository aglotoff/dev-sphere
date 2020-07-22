/**
 * @file Store configuration.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { applyMiddleware, createStore } from 'redux';
import {
    composeWithDevTools,
} from 'redux-devtools-extension/logOnlyInProduction';

// App Imports
import { apiMiddleware } from './middleware/api';
import rootReducer, { AppState } from './reducers/root';

/**
 * Configure the application store.
 *
 * @return The store.
 */
export default function configureStore(preloadedState?: AppState) {
    const composeEnhancers = composeWithDevTools({});
    return createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(apiMiddleware)),
    );
}
