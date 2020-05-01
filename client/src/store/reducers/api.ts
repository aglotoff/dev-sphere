/**
 * @file API reducers and selectors.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { combineReducers } from 'redux';

// App Imports
import {
    ApiActionTypes,
    CHECK_LOGIN_FAILURE,
    CHECK_LOGIN_REQUEST,
    CHECK_LOGIN_SUCCESS,
    // GET_USER_FAILURE,
    // GET_USER_REQUEST,
    GET_USER_SUCCESS,
    IAuthState,
    IUser,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    // LOGOUT_FAILURE,
    // LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from '../types/api';
import { AppState } from './root';

const initialAuthState: IAuthState = {
    accessToken: null,
    isAuthenticating: false,
    isLoginChecked: false,
    isRefreshingToken: false,
};

/**
 * Reducer for the authentication slice of the API state.
 *
 * @param state The current state.
 * @param action The action dispatched.
 *
 * @returns The new state.
 */
export const authReducer = (
    state: IAuthState = initialAuthState,
    action: ApiActionTypes,
) => {
    switch (action.type) {
        case CHECK_LOGIN_REQUEST:
            return {
                ...state,
                isRefreshingToken: true,
            };
        case CHECK_LOGIN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                isLoginChecked: true,
                isRefreshingToken: false,
            };
        case CHECK_LOGIN_FAILURE:
            return {
                ...state,
                isLoginChecked: true,
                isRefreshingToken: false,
            };

        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return {
                ...state,
                errorMessage: null,
                isAuthenticating: true,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                isAuthenticating: false,
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                errorMessage: action.payload.message,
                isAuthenticating: false,
            };

        case REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                isRefreshingToken: true,
            };
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                isRefreshingToken: false,
            };
        case REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                accessToken: null,
                isRefreshingToken: false,
            };

        case LOGOUT_SUCCESS:
            return { ...initialAuthState };

        default:
            return state;
    }
};

/**
 * Reducer for the user slice of the API state.
 *
 * @param state The current state.
 * @param action The action dispatched.
 *
 * @returns The new state.
 */
export const userReducer = (
    state: IUser | null = null,
    action: ApiActionTypes,
) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

/**
 * Reducer for the API part of the application state.
 */
export default combineReducers({
    auth: authReducer,
    user: userReducer,
});

/**
 * Get the API access token.
 *
 * @param state The application state.
 *
 * @return The API access token.
 */
export const getAccessToken = (state: AppState) => state.api.auth.accessToken;

/**
 * Get the current user.
 *
 * @param state The application state.
 *
 * @return The current user.
 */
export const getUser = (state: AppState) => state.api.user;

/**
 * Get the login checked state.
 *
 * @param state The application state.
 *
 * @return true if the initial login check has been performed; false otherwise.
 */
export const getIsLoginChecked = (state: AppState) =>
    state.api.auth.isLoginChecked;

/**
 * Get the current log in state.
 *
 * @param state The application state.
 *
 * @return true if the user is logged in; false otherwise.
 */
export const getIsLoggedIn = (state: AppState) =>
    (state.api.auth.accessToken !== null);

/**
 * Get the current log out state.
 *
 * @param state The application state.
 *
 * @return true if the user is logged out; false otherwise.
 */
export const getIsLoggedOut = (state: AppState) =>
    (state.api.auth.accessToken === null);

/**
 * Get the current authenticating state.
 *
 * @param state The application state.
 *
 * @return true if an authentication request is in progress, false otherwise.
 */
export const getIsAuthenticating = (state: AppState) =>
    state.api.auth.isAuthenticating;

/**
 * Get the current refreshing token state.
 *
 * @param state The application state.
 *
 * @return true if a refresh token request is in progress, false otherwise.
 */
export const getIsRefreshingToken = (state: AppState) =>
    state.api.auth.isRefreshingToken;
