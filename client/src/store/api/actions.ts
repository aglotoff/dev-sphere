/**
 * @file API action creators
 * @author Andrey Glotov
 */

import {
    API_REQUEST,
    CLEAR_ACCESS_TOKEN,
    CLEAR_API_ERROR,
    IApiRequestAction,
    IApiRequestParams,
    IClearAccessTokenAction,
    IClearApiErrorAction,
    ILoginData,
    IRegisterData,
    SET_ACCESS_TOKEN,
} from './types';

/**
 * Create a generic API action.
 *
 * This type of action is handled by the API middleware. It makes a request to
 * the server using the specified parameters and dispatches a new action with
 * the results.
 *
 * @param params The request parameters
 *
 * @returns The created action
 */
export const apiRequest = (params: IApiRequestParams): IApiRequestAction => ({
    type: API_REQUEST,
    payload: params,
});

/**
 * Create a login action.
 *
 * The action makes a login request and on success saves the returned
 * access token to the store.
 *
 * @param data Login credentials
 *
 * @returns The created action
 */
export const login = (data: ILoginData) => apiRequest({
    endpoint: 'auth/login',
    method: 'POST',
    body: data,
    success: SET_ACCESS_TOKEN,
});

/**
 * Create a register action.
 *
 * The action makes a register request and on success saves the returned
 * access token to the store.
 *
 * @param data Login credentials
 *
 * @returns The created action
 */
export const register = (data: IRegisterData) => apiRequest({
    endpoint: 'auth/register',
    method: 'POST',
    body: data,
    success: SET_ACCESS_TOKEN,
});

/**
 * Create a clear API error action.
 *
 * @returns The created action
 */
export const clearApiError = (): IClearApiErrorAction => ({
    type: CLEAR_API_ERROR,
});

/**
 * Create a logout action.
 *
 * Currently this action simply removes the access token from the store.
 *
 * @returns The created action
 */
export const logout = (): IClearAccessTokenAction => ({
    type: CLEAR_ACCESS_TOKEN,
});
