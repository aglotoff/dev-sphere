/**
 * @file Authentication action creators
 * @author Andrey Glotov
 */

import { apiRequest } from '../api/actions';
import {
    CLEAR_AUTH_ERROR,
    GET_USER_ERROR,
    GET_USER_SUCCESS,
    IClearAuthErrorAction,
    ILoginData,
    IRegisterData,
    ISetAuthErrorAction,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    SET_AUTH_ERROR,
} from './types';

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
export const login = (data: ILoginData) => apiRequest({
    endpoint: 'auth/login',
    method: 'POST',
    body: data,
    success: LOGIN_SUCCESS,
    error: LOGIN_ERROR,
});

/**
 * Create a logout action.
 *
 * @param data logout credentials
 *
 * @returns A logout request action
 */
export const logout = () => apiRequest({
    endpoint: 'auth/logout',
    method: 'POST',
    success: LOGOUT_SUCCESS,
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
export const register = (data: IRegisterData) => apiRequest({
    endpoint: 'auth/register',
    method: 'POST',
    body: data,
    success: REGISTER_SUCCESS,
    error: REGISTER_ERROR,
});

/**
 * Create a get user action.
 *
 * This is the first action dispatched by the application to determine if the
 * user is logged in. It fetches the current user info from the server or fails
 * if the user is not authenticated.
 *
 * @param data Login credentials
 *
 * @returns A get user request action
 */
export const getUser = () => apiRequest({
    endpoint: 'auth/user',
    method: 'GET',
    success: GET_USER_SUCCESS,
    error: GET_USER_ERROR,
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
export const setAuthError = (error: string): ISetAuthErrorAction => ({
    type: SET_AUTH_ERROR,
    payload: { error },
});
