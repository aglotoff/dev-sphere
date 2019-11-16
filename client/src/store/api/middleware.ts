import { Middleware } from 'redux';

import { isApiAction, SET_API_ERROR } from './types';

const BASE_URL = '/api/';

const isJSON = (response: Response) => {
    const contentType = response.headers.get('Content-Type');
    return !!contentType && contentType.includes('application/json');
};

export const apiMiddleware: Middleware = (store) => (next) => (action) => {
    if (!isApiAction(action)) {
        return next(action);
    }

    const state = store.getState();
    const actionPayload = action.payload;

    const requestInit: RequestInit = {};
    const headers = new Headers();

    if (typeof actionPayload.body !== 'undefined') {
        headers.set('Content-Type', 'application/json');
        requestInit.body = JSON.stringify(actionPayload.body);
    }

    if (state.api.token !== null) {
        headers.set('Authorization', 'Bearer ' + state.api.token);
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

            if (response.ok) {
                if (actionPayload.success) {
                    if (isJSON(response)) {
                        const data = await response.json();

                        store.dispatch({
                            type: actionPayload.success,
                            payload: data,
                        });
                    } else {
                        store.dispatch({
                            type: actionPayload.success,
                        });
                    }
                }
            } else {
                let error: string;

                if (isJSON(response)) {
                    const data = await response.json();

                    error = data.error;
                } else {
                    error = response.statusText;
                }

                if (actionPayload.error) {
                    store.dispatch({
                        type: actionPayload.error,
                        payload: { error },
                    });
                } else {
                    throw new Error(error);
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
