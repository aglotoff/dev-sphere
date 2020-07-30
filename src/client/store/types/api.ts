/**
 * @file API state types, action constants and shapes.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { CancelToken } from 'axios';
import { Action } from 'redux';

export const API = '@api/API';
export const SET_API_ERROR = '@api/SET_API_ERROR';
export const CLEAR_API_ERROR = '@api/CLEAR_API_ERROR';

/**
 * HTTP request methods.
 */
export type ApiRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Parameters for a generic API request action.
 */
export interface ApiRequestParams {
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

export interface ApiAction extends Action<typeof API> {
    payload: ApiRequestParams;
}

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

export interface SetApiErrorAction extends Action<typeof SET_API_ERROR> {
    payload: Error;
}

export interface ClearApiErrorAction extends Action<typeof CLEAR_API_ERROR> {}

/**
 * All possible API actions
 */
export type ApiActionTypes =
    | ApiAction
    | SetApiErrorAction
    | ClearApiErrorAction;

/**
 * Check whether this is an API request action.
 *
 * @param action The action object.
 * @return True if this an API action; false otherwise.
 */
export function isApiAction(action: Action): action is ApiAction {
    return action.type === API;
}
