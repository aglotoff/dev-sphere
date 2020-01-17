/**
 * @file Root reducer.
 * @author Andrey Glotov
 */

import {
    combineReducers,
    Reducer,
} from 'redux';

import { LOGOUT } from '../types/api';
import apiReducer from './api';

/**
 * Combined reducer for the application store.
 */
export const appReducer = combineReducers({
    api: apiReducer,
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
    (action.type === LOGOUT) ? undefined : state,
    action,
);

export default rootReducer;
