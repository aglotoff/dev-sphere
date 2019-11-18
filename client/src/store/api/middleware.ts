import { Middleware } from 'redux';

import { isApiAction, SET_API_ERROR } from './types';

const BASE_URL = '/api/';

export const apiMiddleware: Middleware = (store) => (next) => (action) => {
    if (!isApiAction(action)) {
        return next(action);
    }

    const actionPayload = action.payload;

    const requestInit: RequestInit = {};
    const headers = new Headers();

    if (typeof actionPayload.body !== 'undefined') {
        headers.set('Content-Type', 'application/json');
        requestInit.body = JSON.stringify(actionPayload.body);
    }

    requestInit.credentials = 'include';
    requestInit.headers = headers;
    requestInit.method = actionPayload.method;

    (async () => {
        try {
            const response = await fetch(
                BASE_URL + actionPayload.endpoint,
                requestInit,
            );

            const responseJson = await response.json();

            if (responseJson.success) {
                if (actionPayload.success) {
                    store.dispatch({
                        type: actionPayload.success,
                        payload: responseJson.data,
                    });
                }
            } else {
                if (actionPayload.error) {
                    store.dispatch({
                        type: actionPayload.error,
                        payload: { error: responseJson.message },
                    });
                } else {
                    throw new Error(responseJson.message);
                }
            }
        } catch (error) {
            store.dispatch({
                type: SET_API_ERROR,
                payload: { error: error.message },
            });
        }
    })();
};
