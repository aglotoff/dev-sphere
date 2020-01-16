import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    CancelTokenSource,
} from 'axios';
import { Middleware } from 'redux';

import { refreshToken } from '../actions/api';
import {
    IApiAction,
    IApiResponse,
    isApiAction,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    REFRESH_TOKEN_SUCCESS,
    SET_API_ERROR,
} from '../types/api';

const BASE_URL = '/api';

export const apiMiddleware: Middleware = ({ dispatch, getState }) => {
    // List of actions waiting for the resfresh token request to complete.
    let pendingActions: IApiAction[] = [];
    // Cancellation tokens for pending requests.
    let cancelSources: CancelTokenSource[] = [];

    return (next) => (action) => {
        if (isApiAction(action)) {
            const {
                accessToken,
                isRefreshingToken,
            } = getState().api.auth;

            const {
                body,
                cancelTokenSource,
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

            if (cancelTokenSource || !skipAuth) {
                const source = cancelTokenSource || axios.CancelToken.source();
                const cancelToken = source.token;

                requestConfig.cancelToken = cancelToken;

                if (!skipAuth) {
                    cancelSources.push(source);

                    if (!cancelTokenSource) {
                        cancelToken.promise.then(function handleCancel() {
                            cancelSources = cancelSources.filter((s) => {
                                return s !== source;
                            });
                        });
                    }
                }
            }

            if (statusHandlers.request) {
                dispatch({ type: statusHandlers.request });
            }

            (async () => {
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
                    }
                } catch (error) {
                    if (axios.isCancel(error)) {
                        // Request has been cancelled.
                        return;
                    }

                    let message = error.message;

                    if (error.response) {
                        const response = error.response as
                            AxiosResponse<IApiResponse>;
                        if (response.data.message) {
                            message = response.data.message;
                        }

                        if (response.status === 401) {
                            // TODO: use application error codes instead of
                            // message strings
                            if (message === 'Access token expired') {
                                pendingActions.push(action);
                                dispatch(refreshToken());
                                return;
                            } else {
                                // TODO: Automatically log out?
                            }
                        }
                    }

                    dispatch({
                        type: statusHandlers.failure || SET_API_ERROR,
                        payload: {
                            status: -1,
                            message,
                        },
                    });
                }
            })();

            return;
        }

        switch (action.type) {
            case REFRESH_TOKEN_SUCCESS:
                if (!getState().api.auth.isRefreshingToken) {
                    return;
                }

                // Call next to update the access token in the store.
                const res = next(action);

                while (pendingActions.length > 0) {
                    const nextAction = pendingActions.shift() as IApiAction;
                    dispatch(nextAction);
                }

                return res;

            case REFRESH_TOKEN_FAILURE:
            case LOGOUT_SUCCESS:
                pendingActions = [];

                while (cancelSources.length > 0) {
                    const source = cancelSources.shift() as CancelTokenSource;
                    source.cancel();
                }

                // Fall through.

            default:
                return next(action);
        }
    };
};
