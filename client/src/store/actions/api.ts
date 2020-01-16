/**
 * @file API action creators
 * @author Andrey Glotov
 */

import {
    API,
    CANCEL_API,
    CLEAR_AUTH_ERROR,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    IApiAction,
    IApiRequestParams,
    ICancelApiAction,
    IClearAuthErrorAction,
    ILoginParams,
    IRegisterParams,
    ISetAuthErrorAction,
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
    SET_AUTH_ERROR,
} from '../types/api';

/**
 * Create a generic API action.
 *
 * This type of action is handled by the API middleware. It makes a request to
 * the server using the specified parameters and dispatches a new action with
 * the results.
 *
 * @param params The request parameters.
 *
 * @returns The created action.
 */
export const apiAction = (params: IApiRequestParams): IApiAction => ({
    type: API,
    payload: params,
});

/**
 * Create a cancel API request action.
 *
 * @param cancelToken The cancellation token for the request.
 *
 * @returns A cancel API request request action
 */
export const cancelApi = (cancelToken: string): ICancelApiAction => ({
    type: CANCEL_API,
    payload: {
        cancelToken,
    },
});

/**
 * Create a login action.
 *
 * The action makes a login request and on success saves the returned user
 * to the store.
 *
 * @param data Login credentials
 *
 * @returns A login request action
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
 * The action makes a register request and on success saves the returned user
 * to the store.
 *
 * @param data Register request payload
 *
 * @returns A registration request action
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
 * @returns A logout request action
 */
export const logout = () => apiAction({
    endpoint: '/auth/logout',
    method: 'POST',
    statusHandlers: {
        request: LOGOUT_REQUEST,
        success: LOGOUT_SUCCESS,
    },
});

/**
 * Create a refresh token action.
 */
export const refreshToken = () => apiAction({
    endpoint: '/auth/refresh_token',
    method: 'POST',
    skipAuth: true,
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
 * @returns A get user request action
 */
export const getUser = () => apiAction({
    endpoint: '/auth/user',
    method: 'GET',
    statusHandlers: {
        request: GET_USER_REQUEST,
        success: GET_USER_SUCCESS,
    },
});

/**
 * Create a clear authentication error action.
 *
 * @returns A clear authentication error action
 */
export const clearAuthError = (): IClearAuthErrorAction => ({
    type: CLEAR_AUTH_ERROR,
});

/**
 * Create a set authentication error action.
 *
 * @returns A set authentication error action
 */
export const setAuthError = (message: string): ISetAuthErrorAction => ({
    type: SET_AUTH_ERROR,
    payload: {
        message,
    },
});
