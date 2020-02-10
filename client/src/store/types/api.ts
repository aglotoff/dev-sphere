/**
 * @file API state types, action constants and shapes.
 * @author Andrey Glotov
 */

import { CancelTokenSource } from 'axios';
import { Action } from 'redux';

/**
 * API authentication state.
 */
export interface IAuthState {
    /** Access token. */
    accessToken: string | null;
    /** Last auhthentication error message. */
    errorMessage: string | null;
    /** Login or register request in progress. */
    isAuthenticating: boolean;
    /** Refresh-token request in progress. */
    isRefreshingToken: boolean;
}

/**
 * Application user.
 */
export interface IUser {
    /** User ID. */
    id: string;
    /** Full user name. */
    fullName: string;
}

/**
 * Generic API error.
 */
export interface IApiError {
    /** HTTP response status code. */
    status: number;
    /** Error message. */
    message: string;
}

export const API = 'api/API';

export const SET_API_ERROR = 'api/SET_API_ERROR';
export const CLEAR_API_ERROR = 'api/CLEAR_API_ERROR';

export const SET_AUTH_ERROR = 'api/SET_AUTH_ERROR';
export const CLEAR_AUTH_ERROR = 'api/CLEAR_AUTH_ERROR';

export const LOGIN_REQUEST = 'api/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'api/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'api/LOGIN_FAILURE';

export const REGISTER_REQUEST = 'api/REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'api/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'api/REGISTER_FAILURE';

export const REFRESH_TOKEN_REQUEST = 'api/REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'api/REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'api/REFRESH_TOKEN_FAILURE';

export const LOGOUT = 'api/LOGOUT';

export const SET_USER = 'api/SET_USER';

/**
 * HTTP request methods.
 */
export type ApiRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Parameters for a generic API request action
 */
export interface IApiRequestParams {
    /** The endpoint of the request (does not include the base url). */
    endpoint: string;

    /** The request's method. */
    method: ApiRequestMethod;

    /** The body contents. */
    body?: object;

    /** Cancel token source object. */
    cancelSource?: CancelTokenSource;

    /** Skip authentication? */
    skipAuth?: boolean;

    /** Actions to be dispatched by the API middleware. */
    statusHandlers?: {
        /** Action type to dispatch before the request. */
        request?: string;
        /** Action type to dispatch on request success. */
        success?: string;
        /** Action type to dispatch on request failure. */
        failure?: string;
    };
}

/**
 * Server response format.
 */
export interface IApiResponse {
    /** Was the request successful? */
    success: boolean;
    /** The response message. */
    message?: string;
    /** Response data. */
    data: any;
}

/**
 * Shape of an API request action.
 */
export interface IApiAction extends Action <
    typeof API
> {
    payload: IApiRequestParams;
}

/**
 * Shape of a set API error action.
 */
export interface ISetApiErrorAction extends Action <
    typeof SET_API_ERROR
> {
    payload: IApiError;
}

/**
 * Shape of a clear API error action.
 */
export interface IClearApiErrorAction extends Action <
    typeof CLEAR_API_ERROR
> {
}

/**
 * Shape of a set authentication error action.
 */
export interface ISetAuthErrorAction extends Action <
    typeof SET_AUTH_ERROR
> {
    payload: {
        /** The error message. */
        message: string;
    };
}

/**
 * Shape of a clear authentication error action.
 */
export interface IClearAuthErrorAction extends Action <
    typeof CLEAR_AUTH_ERROR
> {
}

/**
 * User login credentials.
 */
export interface ILoginParams {
    /** User email. */
    email: string;
    /** User password. */
    password: string;
}

/**
 * Shape of a login request action.
 */
export interface ILoginRequestAction extends Action <
    typeof LOGIN_REQUEST
> {
}

/**
 * Shape of a login request success action.
 */
export interface ILoginSuccessAction extends Action <
    typeof LOGIN_SUCCESS
> {
    payload: {
        /** The access token. */
        accessToken: string;
    };
}

/**
 * Shape of a login request failure action.
 */
export interface ILoginFailureAction extends Action <
    typeof LOGIN_FAILURE
> {
    payload: IApiError;
}

/**
 * Registration request payload.
 */
export interface IRegisterParams {
    /** Full user name. */
    fullName: string;
    /** User email. */
    email: string;
    /** User password. */
    password: string;
}

/**
 * Shape of a register request action.
 */
export interface IRegisterRequestAction extends Action <
    typeof REGISTER_REQUEST
> {
}

/**
 * Shape of a register request success action.
 */
export interface IRegisterSuccessAction extends Action <
    typeof REGISTER_SUCCESS
> {
    payload: {
        /** The access token. */
        accessToken: string;
    };
}

/**
 * Shape of a register request failure action.
 */
export interface IRegisterFailureAction extends Action <
    typeof REGISTER_FAILURE
> {
    payload: IApiError;
}

/**
 * Shape of a refresh token request action.
 */
export interface IRefreshTokenRequestAction extends Action <
    typeof REFRESH_TOKEN_REQUEST
> {
}

/**
 * Shape of a refresh token request success action.
 */
export interface IRefreshTokenSuccessAction extends Action <
    typeof REFRESH_TOKEN_SUCCESS
> {
    payload: {
        /** New access token. */
        accessToken: string;
    };
}

/**
 * Shape of a refresh token request failure action.
 */
export interface IRefreshTokenFailureAction extends Action <
    typeof REFRESH_TOKEN_FAILURE
> {
    payload: IApiError;
}

/**
 * Shape of a logout action.
 */
export interface ILogoutAction extends Action <
    typeof LOGOUT
> {
}

/**
 * Shape of a set user action.
 */
export interface ISetUserAction extends Action <
    typeof SET_USER
> {
    payload: IUser;
}

/**
 * All possible API actions
 */
export type ApiActionTypes =
    | IApiAction
    | ISetApiErrorAction
    | IClearApiErrorAction
    | ISetAuthErrorAction
    | IClearAuthErrorAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailureAction
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailureAction
    | IRefreshTokenRequestAction
    | IRefreshTokenSuccessAction
    | IRefreshTokenFailureAction
    | ILogoutAction
    | ISetUserAction
;

/**
 * Check whether this is an API request action.
 *
 * @param action The action object.
 *
 * @return True if this an API action; false otherwise.
 */
export function isApiAction(action: Action): action is IApiAction  {
    return action.type === API;
}
