/**
 * @file API state types, action constants and shapes
 * @author Andrey Glotov
 */

/**
 * Login credentials
 */
export interface ILoginData {
    /** User email */
    email: string;

    /** User password */
    password: string;
}

/**
 * Register credentials
 */
export interface IRegisterData {
    /** Full user name */
    fullName: string;

    /** User email */
    email: string;

    /** User password */
    password: string;

    agree: boolean;
}

/**
 * API reducer's slice of state
 */
export interface IApiState {
    /** API access token */
    accessToken: string | null;

    /** Last error message */
    error: string | null;
}

export const API_REQUEST = 'API_REQUEST';
export const SET_API_ERROR = 'SET_API_ERROR';
export const CLEAR_API_ERROR = 'CLEAR_API_ERROR';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN';

export interface IApiRequestParams {
    /** The endpoint of the request (does not include the base url) */
    endpoint: string;

    /** the request's method */
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

    /** The body contents */
    body?: object;

    /** Action type to dispatch on success */
    success?: string;

    /** Action type to dispatch on failure */
    error?: string;
}

/**
 * API request action shape
 */
export interface IApiRequestAction {
    type: typeof API_REQUEST;
    payload: IApiRequestParams;
}

/**
 * API default error action shape
 */
export interface ISetApiErrorAction {
    type: typeof SET_API_ERROR;
    payload: {
        /** Error message */
        error: string,
    };
}

/**
 * Clear API error action shape
 */
export interface IClearApiErrorAction {
    type: typeof CLEAR_API_ERROR;
}

/**
 * API set access token action shape
 */
export interface ISetAccessTokenAction {
    type: typeof SET_ACCESS_TOKEN;
    payload: {
        /** Access token */
        token: string,
    };
}

/**
 * API clear access token action shape
 */
export interface IClearAccessTokenAction {
    type: typeof CLEAR_ACCESS_TOKEN;
}

/**
 * All possible API actions
 */
export type ApiActionTypes =
    | IApiRequestAction
    | ISetApiErrorAction
    | IClearApiErrorAction
    | ISetAccessTokenAction
    | IClearAccessTokenAction;
