/**
 * @file API state types, action constants and shapes
 * @author Andrey Glotov
 */

import { Action } from 'redux';

/**
 * API reducer's slice of state
 */
export interface IApiState {
    /** Last error message */
    error: string | null;
}

// Action types
export const API_REQUEST = 'API_REQUEST';
export const SET_API_ERROR = 'SET_API_ERROR';
export const CLEAR_API_ERROR = 'CLEAR_API_ERROR';

/**
 * Parameters for a generic API request action
 */
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
 * All possible API actions
 */
export type ApiActionTypes =
    | IApiRequestAction
    | ISetApiErrorAction
    | IClearApiErrorAction;

/**
 * Check whether this is an API request action.
 *
 * @param action The action object
 */
export const isApiAction = (action: Action): action is IApiRequestAction => {
    return action.type === API_REQUEST;
};
