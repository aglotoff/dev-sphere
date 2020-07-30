/**
 * @file Authentication state reducers and selectors.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { combineReducers, Reducer } from 'redux';

// App Imports
import {
    AuthActionTypes,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    CLEAR_AUTH_ERROR,
    LOGIN_REQUEST,
    REGISTER_REQUEST,
    SET_ACCESS_TOKEN,
} from '../types/auth';

/**
 * Store the API access token for the current user.
 *
 * @param state The current state.
 * @param action The action being dispatched.
 * @returns New state.
 */
export const accessToken: Reducer<string | null, AuthActionTypes> = (
    state = null,
    action,
) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case REFRESH_TOKEN_SUCCESS:
        case SET_ACCESS_TOKEN:
            return action.payload.accessToken;
        default:
            return state;
    }
};

/**
 * Store the last authentication error.
 *
 * @param state The current state.
 * @param action The action being dispatched.
 * @returns New state.
 */
export const error: Reducer<Error | null, AuthActionTypes> = (
    state = null,
    action,
) => {
    switch (action.type) {
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case REFRESH_TOKEN_FAILURE:
            return action.payload;
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case REFRESH_TOKEN_SUCCESS:
        case CLEAR_AUTH_ERROR:
            return null;
        default:
            return state;
    }
};

/**
 * Indicate whether a login or register request is in progress.
 *
 * @param state The current state.
 * @param action The action being dispatched.
 * @returns New state.
 */
export const isAuthenticating: Reducer<boolean, AuthActionTypes> = (
    state = false,
    action,
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return true;
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return false;
        default:
            return state;
    }
};

/**
 * Indicate whether a refresh token request is in progress.
 *
 * @param state The current state.
 * @param action The action being dispatched.
 * @returns New state.
 */
export const isRefreshingToken: Reducer<boolean, AuthActionTypes> = (
    state = false,
    action,
) => {
    switch (action.type) {
        case REFRESH_TOKEN_REQUEST:
            return true;
        case REFRESH_TOKEN_SUCCESS:
        case REFRESH_TOKEN_FAILURE:
            return false;
        default:
            return state;
    }
};

export default combineReducers({
    accessToken,
    error,
    isAuthenticating,
    isRefreshingToken,
});
