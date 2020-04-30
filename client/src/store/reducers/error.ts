/**
 * @file Error state reducers and selectors.
 * @author Andrey Glotov
 */

// Imports
import { AxiosError } from 'axios';

// App Imports
import { IApiResponse } from '../types/api';
import {
    CLEAR_ERROR,
    ErrorActionTypes,
    isErrorAction,
    SET_ERROR,
} from '../types/error';
import { AppState } from './root';

/**
 * Unified reducer for the application error state.
 *
 * Captures all actions with the error field set to true and saves the error
 * object into the store.
 *
 * @param state The current state.
 * @param action The action dispatched.
 *
 * @returns The new state.
 */
const errorReducer = (
    state: Error | null = null,
    action: ErrorActionTypes,
) => {
    // Look for all actions containing the error property.
    if (isErrorAction(action)) {
        return action.payload;
    }

    switch (action.type) {
        case SET_ERROR:
            return action.payload;
        case CLEAR_ERROR:
            return null;
        default:
            return state;
    }
};

/**
 * Get the last error message.
 *
 * @param state The application state.
 *
 * @return The last error message (or null if there is no error).
 */
export const getErrorMessage = (state: AppState) => {
    // TODO: this is an ugly workaround to avoid using "any".
    const error = state.error as AxiosError<IApiResponse> | null;

    if (!error) {
        return null;
    }

    if (error.response && error.response.data.message) {
        return error.response.data.message;
    }

    return error.message;
};

export default errorReducer;
