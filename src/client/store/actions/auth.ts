/**
 * @file Authentication action creators.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { CancelToken } from 'axios';

// App Imports
import { apiAction } from './api';
import {
    LoginRequestParams,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    RegisterRequestParams,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    SET_AUTH_ERROR,
    SetAuthErrorAction,
    CLEAR_AUTH_ERROR,
    ClearAuthErrorAction,
    SetAccessTokenAction,
    SET_ACCESS_TOKEN,
} from '../types/auth';

/**
 * Create an action to make a login request.
 *
 * @param data Login credentials.
 * @returns Action that makes a login request.
 */
export const login = (body: LoginRequestParams) => apiAction({
    endpoint: '/auth/login',
    method: 'POST',
    skipAuth: true,
    body,
    statusHandlers: {
        request: LOGIN_REQUEST,
        success: LOGIN_SUCCESS,
        failure: LOGIN_FAILURE,
    },
});

/**
 * Create an action to make a register request.
 *
 * @param data Register request payload.
 * @returns Action that makes a register request.
 */
export const register = (body: RegisterRequestParams) => apiAction({
    endpoint: '/auth/register',
    method: 'POST',
    skipAuth: true,
    body,
    statusHandlers: {
        request: REGISTER_REQUEST,
        success: REGISTER_SUCCESS,
        failure: REGISTER_FAILURE,
    },
});

/**
 * Create an action to make a logout request.
 *
 * @returns Action that makes a logout request.
 */
export const logout = () => apiAction({
    endpoint: '/auth/logout',
    method: 'POST',
    statusHandlers: {
        request: LOGOUT_REQUEST,
        success: LOGOUT_SUCCESS,
        failure: LOGOUT_FAILURE,
    },
});

/**
 * Create an action for refreshing the access token.
 *
 * @param cancelToken Optional cancellation token.
 * @returns Action for refreshing the access token.
 */
export const refreshToken = (cancelToken?: CancelToken) => apiAction({
    endpoint: '/auth/refresh_token',
    method: 'POST',
    cancelToken,
    statusHandlers: {
        request: REFRESH_TOKEN_REQUEST,
        success: REFRESH_TOKEN_SUCCESS,
        failure: REFRESH_TOKEN_FAILURE,
    },
});

/**
 * Create an action that sets the access token during server-side rendering.
 *
 * @param accessToken New access token.
 * @returns An action that sets the access token.
 */
export const setAccessToken = (accessToken: string): SetAccessTokenAction => ({
    type: SET_ACCESS_TOKEN,
    payload: { accessToken },
});

/**
 * Create an action that sets the authentication error.
 *
 * @param error The error object.
 * @returns An action that sets the authentication error.
 */
export const setAuthError = (error: Error): SetAuthErrorAction => ({
    type: SET_AUTH_ERROR,
    payload: error,
});

/**
 * Create an action that clears the authentication error.
 *
 * @returns An action that clears the authentication error.
 */
export const clearAuthError = (): ClearAuthErrorAction => ({
    type: CLEAR_AUTH_ERROR,
});
