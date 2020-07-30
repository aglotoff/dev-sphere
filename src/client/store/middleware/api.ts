/**
 * @file Generic API Middleware.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Middleware } from 'redux';

// App Imports
import { refreshToken } from '../actions/auth';
import { fetchUser } from '../actions/user';
import {
    getAccessToken,
    getIsRefreshingToken,
} from '../selectors/auth';
import {
    ApiAction,
    ApiResponse,
    isApiAction,
    SET_API_ERROR,
} from '../types/api';
import {
    REFRESH_TOKEN_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
} from '../types/auth';

const BASE_URL = '/api';

/**
 * Middleware that handles server communication and authentication.
 *
 * This middleware intercepts all actions of type API and makes a server
 * request using the specified parameters.
 *
 * During the request's lifecycle, optional additional actions are being
 * dispatched: before the request, after successful request, and after
 * request error. If no error handler is specified, a default error action is
 * dispatched.
 *
 * If authentication is required, adds an authorization header containing the
 * access token. When the access token expires, automatically refreshes the
 * token and re-issues failed requests.
 */
export const apiMiddleware: Middleware = ({ dispatch, getState }) => {
    // List of actions waiting for the resfresh token request to complete.
    const pendingActions: ApiAction[] = [];

    /**
     * Handle an API request action.
     *
     * @param action The action dispatched.
     */
    async function handleApiAction(action: ApiAction) {
        const currentState = getState();
        const accessToken = getAccessToken(currentState);
        const isRefreshingToken = getIsRefreshingToken(currentState);

        const {
            body,
            cancelToken,
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
            headers.Authorization = `Bearer ${accessToken}`;
        }

        requestConfig.url = BASE_URL + endpoint;
        requestConfig.method = method;
        requestConfig.headers = headers;
        requestConfig.data = body;
        requestConfig.cancelToken = cancelToken;

        if (statusHandlers.request) {
            dispatch({ type: statusHandlers.request });
        }

        try {
            const response = await axios(requestConfig);
            const responseBody = response.data;

            if (responseBody.success) {
                if (statusHandlers.success) {
                    dispatch({
                        type: statusHandlers.success,
                        payload: responseBody.data,
                    });
                }
            } else {
                // Will be catched below
                throw new Error(responseBody.message);
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse<unknown>>;

            // If the request has been cancelled, no further processing is
            // required.
            if (axios.isCancel(axiosError)) {
                return;
            }

            const { response } = axiosError;

            // If the request failed because of access token expiration, try
            // to refresh token and retry the action later
            if (response && (response.status === 401)) {
                // TODO: use application error codes instead of message strings.
                if (response.data.message === 'Access token expired') {
                    pendingActions.push({
                        ...action,
                        payload: {
                            ...action.payload,
                            // Do not dispatch an extra "request" action
                            statusHandlers: {
                                success: statusHandlers.success,
                                failure: statusHandlers.failure,
                            },
                        },
                    });

                    if (!getIsRefreshingToken(getState())) {
                        dispatch(refreshToken());
                    }

                    return;
                }
            }

            // Allow the caller to handle the error or fall back to the default
            // error action.
            dispatch({
                type: statusHandlers.failure || SET_API_ERROR,
                payload: error,
                error: true,
            });
        }
    }

    return (next) => (action) => {
        if (isApiAction(action)) {
            return handleApiAction(action);
        }

        const res = next(action);

        switch (action.type) {
            // Retry all pending requests upon successful token refresh.
            case REFRESH_TOKEN_SUCCESS:
                while (pendingActions.length > 0) {
                    const nextAction = pendingActions.shift() as ApiAction;
                    dispatch(nextAction);
                }
                break;

            // Fetch user info and notifications upon successful login.
            case LOGIN_SUCCESS:
            case REGISTER_SUCCESS:
                dispatch(fetchUser());
                break;

            default:
                break;
        }

        return res;
    };
};
