/**
 * @file Authentication state types, action constants and shapes.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { Action } from 'redux';

// Action constants
export const LOGIN_REQUEST = '@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@auth/LOGIN_FAILURE';
export const REGISTER_REQUEST = '@auth/REGISTER_REQUEST';
export const REGISTER_SUCCESS = '@auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = '@auth/REGISTER_FAILURE';
export const REFRESH_TOKEN_REQUEST = '@auth/REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = '@auth/REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = '@auth/REFRESH_TOKEN_FAILURE';
export const CHECK_LOGIN_REQUEST = '@auth/CHECK_LOGIN_REQUEST';
export const CHECK_LOGIN_SUCCESS = '@auth/CHECK_LOGIN_SUCCESS';
export const CHECK_LOGIN_FAILURE = '@auth/CHECK_LOGIN_FAILURE';
export const LOGOUT_REQUEST = '@auth/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = '@auth/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = '@auth/LOGOUT_FAILURE';
export const SET_ACCESS_TOKEN = '@auth/SET_ACCESS_TOKEN';
export const SET_AUTH_ERROR = '@auth/SET_AUTH_ERROR';
export const CLEAR_AUTH_ERROR = '@auth/CLEAR_AUTH_ERROR';

/**
 * Generic server response format.
 */
export interface ApiResponse<T> {
    /** Was the request successful? */
    success: boolean;
    /** The response message. */
    message?: string;
    /** Response data. */
    data?: T;
}

/**
 * Login request body.
 */
export interface LoginRequestParams {
    /** User email. */
    email: string;
    /** User password. */
    password: string;
}

/**
 * Format of the login request response data field.
 */
export interface LoginResponseData {
    /** The access token. */
    accessToken: string;
}

export interface LoginRequestAction extends Action<typeof LOGIN_REQUEST> {
}

export interface LoginSuccessAction extends Action <typeof LOGIN_SUCCESS> {
    payload: LoginResponseData;
}

export interface LoginFailureAction extends Action<typeof LOGIN_FAILURE> {
    payload: Error;
}

/**
 * Register request body.
 */
export interface RegisterRequestParams {
    /** Does the user agree to accept the Terms of Service? */
    consent: boolean;
    /** Full user name. */
    fullName: string;
    /** User email. */
    email: string;
    /** User password. */
    password: string;
}

/**
 * Format of the register request response data field.
 */
export interface RegisterResponseData {
    /** The access token. */
    accessToken: string;
}

export interface RegisterRequestAction extends Action<typeof REGISTER_REQUEST> {
}

export interface RegisterSuccessAction extends Action<typeof REGISTER_SUCCESS> {
    payload: RegisterResponseData;
}

export interface RegisterFailureAction extends Action<typeof REGISTER_FAILURE> {
    payload: Error;
}

export interface RefreshTokenResponseData {
    /** The access token. */
    accessToken: string;
}

export interface RefreshTokenRequestAction extends Action<
    typeof REFRESH_TOKEN_REQUEST
> {
}

export interface RefreshTokenSuccessAction extends Action<
    typeof REFRESH_TOKEN_SUCCESS
> {
    payload: RefreshTokenResponseData;
}

export interface RefreshTokenFailureAction extends Action<
    typeof REFRESH_TOKEN_FAILURE
> {
    payload: Error;
}

export interface LogoutRequestAction extends Action<typeof LOGOUT_REQUEST> {}

export interface LogoutSuccessAction extends Action <typeof LOGOUT_SUCCESS> {}

export interface LogoutFailureAction extends Action<typeof LOGOUT_FAILURE> {
    payload: Error;
}

export interface SetAccessTokenAction extends Action<typeof SET_ACCESS_TOKEN> {
    payload: {
        accessToken: string;
    };
}

export interface SetAuthErrorAction extends Action<typeof SET_AUTH_ERROR> {
    payload: Error;
}

export interface ClearAuthErrorAction extends Action<typeof CLEAR_AUTH_ERROR> {}

/**
 * All possible authentication actions
 */
export type AuthActionTypes =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | RegisterRequestAction
    | RegisterSuccessAction
    | RegisterFailureAction
    | RefreshTokenRequestAction
    | RefreshTokenSuccessAction
    | RefreshTokenFailureAction
    | LogoutRequestAction
    | LogoutSuccessAction
    | LogoutFailureAction
    | SetAccessTokenAction
    | SetAuthErrorAction
    | ClearAuthErrorAction;
