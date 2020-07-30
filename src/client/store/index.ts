/**
 * @file Store configuration.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import {
    Action,
    applyMiddleware,
    combineReducers,
    createStore,
    Reducer,
} from 'redux';
import {
    composeWithDevTools,
} from 'redux-devtools-extension/logOnlyInProduction';

// App Imports
import { apiMiddleware } from './middleware/api';
import { LOGOUT_SUCCESS } from './types/auth';

// Subtree Reducers Imports
import api from './reducers/api';
import auth from './reducers/auth';
import user from './reducers/user';

const rootReducer = combineReducers({
    api,
    auth,
    user,
});

/**
 * Shape of the application global state.
 */
export type AppState = ReturnType<typeof rootReducer>;

/**
 * The main application reducer.
 *
 * Resets the state upon a LOGOUT_SUCCESS action; otherwise delegates action
 * handling to the normal reducer.
 *
 * @param state The current application state.
 * @param action The action dispatched.
 *
 * @returns The new application state.
 */
export const appReducer: Reducer<AppState, Action> = (
    state,
    action,
) => rootReducer(
    action.type === LOGOUT_SUCCESS ? undefined : state,
    action,
);

/**
 * Configure the application store.
 *
 * @param preloadedState State preloaded during server-side rendering.
 * @return The store.
 */
export const configureStore = (preloadedState?: AppState) => {
    const composeEnhancers = composeWithDevTools({});

    return createStore(appReducer, preloadedState, composeEnhancers(
        applyMiddleware(
            apiMiddleware,
        ),
    ));
};
