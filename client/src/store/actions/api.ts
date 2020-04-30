/**
 * @file API action creators.
 * @author Andrey Glotov
 */

// Imports
import { CancelToken } from 'axios';

// App Imports
import {
    API,
    CHECK_LOGIN_FAILURE,
    CHECK_LOGIN_REQUEST,
    CHECK_LOGIN_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    IApiAction,
    IApiRequestParams,
    ILoginParams,
    IRegisterParams,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from '../types/api';

/**
 * Create a generic API action.
 *
 * This type of action is handled by the API middleware. The middleware makes a
 * request to the server using the specified parameters and dispatches
 * additional actions during the request's lifecycle.
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
 * @param cancelToken Optional cancellation token.
 *
 * @returns An API action to make the login request.
 */
export const login = (body: ILoginParams, cancelToken?: CancelToken) =>
    apiAction({
        endpoint: '/auth/login',
        method: 'POST',
        skipAuth: true,
        body,
        cancelToken,
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
 * @param cancelToken Optional cancellation token.
 *
 * @returns An API action to make the register request.
 */
export const register = (body: IRegisterParams, cancelToken?: CancelToken) =>
    apiAction({
        endpoint: '/auth/register',
        method: 'POST',
        skipAuth: true,
        body,
        cancelToken,
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
        request: LOGOUT_REQUEST,
        success: LOGOUT_SUCCESS,
        failure: LOGOUT_FAILURE,
    },
});

/**
 * Create a refresh token action.
 *
 * @param cancelToken Optional cancellation token.
 *
 * @returns An API action to make the refresh token request.
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
 * Create a check login action.
 *
 * This is just a refresh token request perfomed by the application on initial
 * load to determine if the user has been previously logged in.
 *
 * @returns An API action to make the refresh token request.
 */
export const checkLogin = () => apiAction({
    endpoint: '/auth/refresh_token',
    method: 'POST',
    statusHandlers: {
        request: CHECK_LOGIN_REQUEST,
        success: CHECK_LOGIN_SUCCESS,
        failure: CHECK_LOGIN_FAILURE,
    },
});

/**
 * Create a get user action.
 *
 * This action is dispatched by the application after a successful login.
 *
 * @returns An API action to make the get user request.
 */
export const getUser = () => apiAction({
    endpoint: '/auth/user',
    method: 'GET',
    statusHandlers: {
        request: GET_USER_REQUEST,
        success: GET_USER_SUCCESS,
        failure: GET_USER_FAILURE,
    },
});
