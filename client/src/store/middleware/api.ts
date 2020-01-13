import { Middleware } from 'redux';

import { refreshToken } from '../actions/api';
import {
    IApiAction,
    isApiAction,
    REFRESH_TOKEN_SUCCESS,
    SET_API_ERROR,
} from '../types/api';

const BASE_URL = '/api';

let refreshingToken = false;
const pendingActions: IApiAction[] = [];

export const apiMiddleware: Middleware = ({
    dispatch,
    getState,
}) => (next) => (action) => {
    if (isApiAction(action)) {
        const payload = action.payload;

        if (refreshingToken && !payload.skipAuth) {
            pendingActions.push(action);
            return;
        }

        const requestInit: RequestInit = {};
        const headers = new Headers();

        if (!payload.skipAuth) {
            const accessToken = getState().api.auth.accessToken;
            if (accessToken) {
                headers.set('Authorization', 'Bearer ' + accessToken);
            }
        }

        if (payload.body && (typeof payload.body === 'object')) {
            headers.set('Content-Type', 'application/json');
            requestInit.body = JSON.stringify(payload.body);
        }

        requestInit.credentials = 'include';
        requestInit.headers = headers;
        requestInit.method = payload.method;

        const statusHandlers = payload.statusHandlers || {};

        if (statusHandlers.request) {
            dispatch({ type: statusHandlers.request });
        }

        (async () => {
            try {
                const response = await fetch(
                    BASE_URL + payload.endpoint,
                    requestInit,
                );

                const responseData = await response.json();

                if (responseData.success) {
                    // TODO: default API success action?

                    if (statusHandlers.success) {
                        dispatch({
                            type: statusHandlers.success,
                            payload: responseData.data,
                        });
                    }
                } else if (
                    !payload.skipAuth &&
                    (responseData.message === 'Access token expired')
                ) {
                    // TODO: if already fetching a new token?

                    refreshingToken = true;
                    pendingActions.push(action);

                    dispatch(refreshToken());
                } else {
                    dispatch({
                        type: statusHandlers.failure || SET_API_ERROR,
                        payload: {
                            status: response.status,
                            message: responseData.message,
                        },
                    });
                }
            } catch (error) {
                dispatch({
                    type: statusHandlers.failure || SET_API_ERROR,
                    payload: {
                        status: -1,
                        message: error.message,
                    },
                });
            }
        })();

        return;
    }

    switch (action.type) {
        case REFRESH_TOKEN_SUCCESS:
            next(action);

            refreshingToken = false;

            while (pendingActions.length > 0) {
                const nextAction = pendingActions.shift() as IApiAction;
                dispatch(nextAction);
            }

            break;

        default:
            next(action);
            break;
    }
};
