/**
 * @file Generic API Middleware.
 * @author Andrey Glotov
 */

import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    CancelTokenSource,
} from 'axios';
import { Middleware } from 'redux';

import { refreshToken } from '../actions/api';
import {
    getAccessToken,
    getIsLoggedIn,
    getIsRefreshingToken,
} from '../reducers/api';
import {
    IApiAction,
    IApiResponse,
    isApiAction,
    LOGIN_SUCCESS,
    LOGOUT,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_SUCCESS,
    SET_API_ERROR,
} from '../types/api';

const BASE_URL = '/api';

/**
 * Middleware that handles server communication and authentication.
 */
export const apiMiddleware: Middleware = ({ dispatch, getState }) => {
    // List of actions waiting for the resfresh token request to complete.
    let pendingActions: IApiAction[] = [];

    // Cancellation tokens for pending requests.
    let cancelSources: CancelTokenSource[] = [];

    /**
     * Handle an API request action.
     *
     * @param action The action dispatched.
     */
    async function handleApiAction(action: IApiAction) {
        const currentState = getState();
        const accessToken = getAccessToken(currentState);
        const isRefreshingToken = getIsRefreshingToken(currentState);

        const {
            body,
            cancelSource,
            endpoint,
            method,
            skipAuth,
            statusHandlers = {},
        } = action.payload;

        if (isRefreshingToken && !skipAuth) {
            pendingActions.push(action);
            return;
        }

        const requestConfig: AxiosRequestConfig = {};
        const headers: any = {};

        if (!skipAuth && accessToken) {
            headers.Authorization = 'Bearer ' + accessToken;
        }

        requestConfig.url = BASE_URL + endpoint;
        requestConfig.method = method;
        requestConfig.headers = headers;
        requestConfig.data = body;

        let source = cancelSource;
        if (!source && !skipAuth) {
            source = axios.CancelToken.source();
        }

        if (source) {
            requestConfig.cancelToken = source.token;
            if (!skipAuth) {
                cancelSources.push(source);
            }
        }

        if (statusHandlers.request) {
            dispatch({ type: statusHandlers.request });
        }

        try {
            const response = await axios(requestConfig);

            const responseBody = response.data;

            if (responseBody.success && statusHandlers.success) {
                dispatch({
                    type: statusHandlers.success,
                    payload: responseBody.data,
                });
            } else if (!responseBody.success && statusHandlers.failure) {
                // TODO: actually, we should not get here because all failed
                // requests are supposed to throw an exception.
                dispatch({
                    type: statusHandlers.failure,
                    payload: {
                        status: response.status,
                        message: responseBody.message,
                    },
                });
            }
        } catch (error) {
            // If the request has been cancelled, no further processing is
            // required.
            if (axios.isCancel(error)) {
                return;
            }

            // If this is a network or unknown client-side error, dispatch a
            // default error action.
            if (!error.response) {
                dispatch({
                    type: SET_API_ERROR,
                    payload: {
                        status: -1,
                        message: error.message,
                    },
                });
                return;
            }

            const {
                data: { message },
                status,
            } = error.response as AxiosResponse<IApiResponse>;

            if (status === 401) {
                const newState = getState();

                // TODO: use application error codes instead of message strings.
                if (message === 'Access token expired') {
                    // Token expired: add the failed action to the queue to
                    // retry later after obtaining a new token.
                    if (!getIsRefreshingToken(newState)) {
                        pendingActions.push(action);

                        dispatch(refreshToken(axios.CancelToken.source()));
                    }
                    return;
                } else {
                    // Automatically log out upon getting an Unauthorized error.
                    if (getIsLoggedIn(newState)) {
                        dispatch({ type: LOGOUT });
                    }
                }
            }

            // Allow the caller to handle the error or fall back to the default
            // error action.
            dispatch({
                type: statusHandlers.failure || SET_API_ERROR,
                payload: {
                    status,
                    message: message || error.message,
                },
            });
        } finally {
            // Regardless of whether or not the request has been successfully
            // finished, we have to remove the cancel source from the list.
            if (source != null) {
                cancelSources = cancelSources.filter((s) => {
                    return s !== source;
                });
            }
        }
    }

    return (next) => (action) => {
        if (isApiAction(action)) {
            return handleApiAction(action);
        }

        const currentState = getState();

        switch (action.type) {
            // Retry all pending requests upon successful token refresh.
            case REFRESH_TOKEN_SUCCESS:
                if (!getIsRefreshingToken(currentState)) {
                    return;
                }

                // Update the access token before issuing new requests.
                const res = next(action);

                while (pendingActions.length > 0) {
                    const nextAction = pendingActions.shift() as IApiAction;
                    dispatch(nextAction);
                }

                return res;

            // Abort all pending requests upon user logout.
            case LOGOUT:
                pendingActions = [];

                while (cancelSources.length > 0) {
                    const source = cancelSources.shift() as CancelTokenSource;
                    source.cancel();
                }

                return next(action);

            // Make sure the state is reset before login/logout.
            case LOGIN_SUCCESS:
            case REGISTER_SUCCESS:
                if (getIsLoggedIn(currentState)) {
                    dispatch({ type: LOGOUT });
                }
                return next(action);

            default:
                return next(action);
        }
    };
};
