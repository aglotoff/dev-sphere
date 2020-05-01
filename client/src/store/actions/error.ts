/**
 * @file Error action creators.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// App Imports
import {
    CLEAR_ERROR,
    IClearErrorAction,
    ISetErrorAction,
    SET_ERROR,
} from '../types/error';

/**
 * Manually create a set error action.
 *
 * @param error The error object.
 *
 * @returns A set error action.
 */
export const setError = (error: Error): ISetErrorAction => ({
    type: SET_ERROR,
    payload: error,
});

/**
 * Create a clear error action.
 *
 * @returns A cleart error action.
 */
export const clearError = (): IClearErrorAction => ({
    type: CLEAR_ERROR,
});
