import { Middleware } from 'redux';

import { API_REQUEST, SET_API_ERROR } from './types';

const BASE_URL = '/api/';

export const apiMiddleware: Middleware = (store) => (next) => (action) => {
        if (action.type !== API_REQUEST) {
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

        requestInit.headers = headers;
        requestInit.method = actionPayload.method;

        (async () => {
            try {
                const response = await fetch(
                    BASE_URL + actionPayload.endpoint,
                    requestInit,
                );

                const data = await response.json();

                if (response.ok) {
                    if (actionPayload.success) {
                        store.dispatch({
                            type: actionPayload.success,
                            payload: data,
                        });
                    }
                } else {
                    throw new Error(data.error || response.statusText);
                }
            } catch (error) {
                store.dispatch({
                    type: actionPayload.error || SET_API_ERROR,
                    payload: { error: error.message },
                });
            }
        })();
    };
