/**
 * @file API action creators.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// App Imports
import { API, ApiAction, ApiRequestParams } from '../types/api';

/**
 * Create a generic API action.
 *
 * This type of action is handled by the API middleware. The middleware makes a
 * request to the server using the specified parameters and dispatches
 * additional actions during the request's lifecycle.
 *
 * @param params The request parameters.
 * @returns An API action representing the request.
 */
export const apiAction = (params: ApiRequestParams): ApiAction => ({
    type: API,
    payload: params,
});
