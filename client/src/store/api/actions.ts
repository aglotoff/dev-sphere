/**
 * @file API action creators
 * @author Andrey Glotov
 */

import {
    API_REQUEST,
    IApiRequestAction,
    IApiRequestParams,
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
