/**
 * @file API state reducer.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { combineReducers, Reducer } from 'redux';

// App Imports
import {
    SET_API_ERROR,
    CLEAR_API_ERROR,
    ApiActionTypes,
} from '../types/api';

/**
 * Store the last API error.
 *
 * @param state The current state.
 * @param action The action being dispatched.
 * @returns New state.
 */
export const error: Reducer<Error | null, ApiActionTypes> = (
    state = null,
    action,
) => {
    switch (action.type) {
        case SET_API_ERROR:
            return action.payload;
        case CLEAR_API_ERROR:
            return null;
        default:
            return state;
    }
};

export default combineReducers({
    error,
});
