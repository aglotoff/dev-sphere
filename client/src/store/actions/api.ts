/**
 * @file API action creators.
 * @author Andrey Glotov
 */

import { CancelTokenSource } from 'axios';

import {
    API,
    CLEAR_AUTH_ERROR,
    IApiAction,
    IApiRequestParams,
    IClearAuthErrorAction,
    ILoginParams,
    IRegisterParams,
    ISetAuthErrorAction,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REFRESH_TOKEN_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    SET_AUTH_ERROR,
    SET_USER,
} from '../types/api';

/**
 * Create a generic API action.
 *
 * This type of action is handled by the API middleware. It makes a request to
 * the server using the specified parameters and dispatches a new action
 * depending on the results.
 *
 * @param params The request parameters.
 *
 * @returns An API action representing the request.
 */
export const apiAction = (params: IApiRequestParams): IApiAction => ({
    type: API,
    payload: params,
});

/**
 * Create a login action.
 *
 * @param data Login credentials.
 *
 * @returns An API action to make the login request.
 */
export const login = (body: ILoginParams) => apiAction({
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
 * Create a register action.
 *
 * @param data Register request payload.
 *
 * @returns An API action to make the register request.
 */
export const register = (body: IRegisterParams) => apiAction({
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
 * Create a logout action.
 *
 * @returns An API action to make the logout request.
 */
export const logout = () => apiAction({
    endpoint: '/auth/logout',
    method: 'POST',
    statusHandlers: {
        success: LOGOUT,
    },
});

/**
 * Create a refresh token action.
 *
 * @param cancelSource A token source object used to cancel the request.
 *
 * @returns An API action to make the refresh token request.
 */
export const refreshToken = (cancelSource?: CancelTokenSource) => apiAction({
    endpoint: '/auth/refresh_token',
    method: 'POST',
    cancelSource,
    statusHandlers: {
        request: REFRESH_TOKEN_REQUEST,
        success: REFRESH_TOKEN_SUCCESS,
        failure: REFRESH_TOKEN_FAILURE,
    },
});

/**
 * Create a get user action.
 *
 * This is the first action dispatched by the application to fetch the current
 * user data from the server.
 *
 * @returns An API action to make the get user request.
 */
export const getUser = () => apiAction({
    endpoint: '/auth/user',
    method: 'GET',
    statusHandlers: {
        success: SET_USER,
    },
});

/**
 * Create a clear authentication error action.
 *
 * @returns A clear authentication error action.
 */
export const clearAuthError = (): IClearAuthErrorAction => ({
    type: CLEAR_AUTH_ERROR,
});

/**
 * Create a set authentication error action.
 *
 * @returns A set authentication error action.
 */
export const setAuthError = (message: string): ISetAuthErrorAction => ({
    type: SET_AUTH_ERROR,
    payload: {
        message,
    },
});
