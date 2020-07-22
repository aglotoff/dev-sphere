/**
 * @file API state types, action constants and shapes.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { CancelToken } from 'axios';
import { Action } from 'redux';

// App Imports
import { ErrorAction } from './error';

/**
 * API authentication state.
 */
export interface IAuthState {
    /** Access token. */
    accessToken: string | null;
    /** Login or register request in progress. */
    isAuthenticating: boolean;
    /** Should the application perform a login check request? */
    isLoginChecked: boolean;
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

export const API = '@api/API';

export const LOGIN_REQUEST = '@api/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@api/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@api/LOGIN_FAILURE';

export const REGISTER_REQUEST = '@api/REGISTER_REQUEST';
export const REGISTER_SUCCESS = '@api/REGISTER_SUCCESS';
export const REGISTER_FAILURE = '@api/REGISTER_FAILURE';

export const REFRESH_TOKEN_REQUEST = '@api/REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = '@api/REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = '@api/REFRESH_TOKEN_FAILURE';

export const CHECK_LOGIN_REQUEST = '@api/CHECK_LOGIN_REQUEST';
export const CHECK_LOGIN_SUCCESS = '@api/CHECK_LOGIN_SUCCESS';
export const CHECK_LOGIN_FAILURE = '@api/CHECK_LOGIN_FAILURE';

export const LOGOUT_REQUEST = '@api/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = '@api/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = '@api/LOGOUT_FAILURE';

export const GET_USER_REQUEST = '@api/GET_USER_REQUEST';
export const GET_USER_SUCCESS = '@api/GET_USER_SUCCESS';
export const GET_USER_FAILURE = '@api/GET_USER_FAILURE';

/**
 * HTTP request methods.
 */
export type ApiRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Parameters for a generic API request action.
 */
export interface IApiRequestParams {
    /** The endpoint of the request (does not include the base URL). */
    endpoint: string;
    /** The request's method. */
    method: ApiRequestMethod;
    /** The body contents. */
    body?: any;
    /** Request cancellation token. */
    cancelToken?: CancelToken;
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
 * Shape of a login request action.
 */
export interface ILoginFailureAction extends ErrorAction<
    typeof LOGIN_FAILURE
> {
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
 * Shape of a register request action.
 */
export interface IRegisterFailureAction extends ErrorAction <
    typeof REGISTER_FAILURE
> {
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
export interface IRefreshTokenFailureAction extends ErrorAction <
    typeof REFRESH_TOKEN_FAILURE
> {
}

/**
 * Shape of a check login request action.
 */
export interface ICheckLoginRequestAction extends Action <
    typeof CHECK_LOGIN_REQUEST
> {
}

/**
 * Shape of a check login request success action.
 */
export interface ICheckLoginSuccessAction extends Action <
    typeof CHECK_LOGIN_SUCCESS
> {
    payload: {
        /** New access token. */
        accessToken: string;
    };
}

/**
 * Shape of a check login request failure action.
 */
export interface ICheckLoginFailureAction extends ErrorAction <
    typeof CHECK_LOGIN_FAILURE
> {
}

/**
 * Shape of a logout request action.
 */
export interface ILogoutRequestAction extends Action <
    typeof LOGOUT_REQUEST
> {
}

/**
 * Shape of a logout request success action.
 */
export interface ILogoutSuccessAction extends Action <
    typeof LOGOUT_SUCCESS
> {
}

/**
 * Shape of a logout request failure action.
 */
export interface ILogoutFailureAction extends ErrorAction <
    typeof LOGOUT_FAILURE
> {
}

/**
 * Shape of a get user request action.
 */
export interface IGetUserRequestAction extends Action <
    typeof GET_USER_REQUEST
> {
}

/**
 * Shape of a get user request success action.
 */
export interface IGetUserSuccessAction extends Action <
    typeof GET_USER_SUCCESS
> {
    payload: IUser;
}

/**
 * Shape of a get user request failure action.
 */
export interface IGetUserFailureAction extends ErrorAction <
    typeof GET_USER_FAILURE
> {
}

/**
 * All possible API actions
 */
export type ApiActionTypes =
    | IApiAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailureAction
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailureAction
    | IRefreshTokenRequestAction
    | IRefreshTokenSuccessAction
    | IRefreshTokenFailureAction
    | ICheckLoginRequestAction
    | ICheckLoginSuccessAction
    | ICheckLoginFailureAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailureAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailureAction;

/**
 * Check whether this is an API request action.
 *
 * @param action The action object.
 * @return True if this an API action; false otherwise.
 */
export function isApiAction(action: Action): action is IApiAction {
    return action.type === API;
}
