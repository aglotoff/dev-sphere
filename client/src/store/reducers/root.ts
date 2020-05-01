/**
 * @file Root reducer.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { combineReducers, Reducer } from 'redux';

// App Imports
import { LOGOUT_SUCCESS } from '../types/api';
import apiReducer from './api';
import errorReducer from './error';

/**
 * Combined reducer for the application store.
 */
export const appReducer = combineReducers({
    api: apiReducer,
    error: errorReducer,
});

/** Shape of the application state. */
export type AppState = ReturnType<typeof appReducer>;

/**
 * The root reducer.
 *
 * Resets the state upon a LOGOUT action; otherwise delegates action handling
 * to the normal application reducer.
 *
 * @param state The current application state.
 * @param action The action dispatched.
 *
 * @returns The new application state.
 */
const rootReducer: Reducer<AppState> = (state, action) => appReducer(
    (action.type === LOGOUT_SUCCESS) ? undefined : state,
    action,
);

export default rootReducer;
