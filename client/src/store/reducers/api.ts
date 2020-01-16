/**
 * @file API reducers.
 * @author Andrey Glotov
 */

import {
    ApiActionTypes,
    CLEAR_API_ERROR,
    CLEAR_AUTH_ERROR,
    GET_USER_SUCCESS,
    IApiState,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    SET_API_ERROR,
    SET_AUTH_ERROR,
} from '../types/api';

const initialState: IApiState = {
    auth: {
        user: null,
        accessToken: null,
        errorMessage: null,
        isAuthenticating: false,
        isRefreshingToken: false,
    },
    error: null,
};

/**
 * The API reducer
 *
 * @param state The current state
 * @param action The dispatched action
 */
export const apiReducer = (
    state: IApiState = initialState,
    action: ApiActionTypes,
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    errorMessage: null,
                    isAuthenticating: true,
                },
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    accessToken: action.payload.accessToken,
                    isAuthenticating: false,
                },
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    errorMessage: action.payload.message,
                    isAuthenticating: false,
                },
            };

        case REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    isRefreshingToken: true,
                },
            };
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    accessToken: action.payload.accessToken,
                    isRefreshingToken: false,
                },
            };
        case REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    accessToken: null,
                    isRefreshingToken: false,
                    user: null,
                },
            };

        case SET_AUTH_ERROR:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    errorMessage: action.payload.message,
                },
            };
        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    errorMessage: null,
                },
            };

        case SET_API_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case CLEAR_API_ERROR:
            return {
                ...state,
                error: null,
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    user: null,
                    accessToken: null,
                    isRefreshingToken: false,
                },
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    user: action.payload,
                },
            };

        default:
            return state;
    }
};
