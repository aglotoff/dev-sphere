/**
 * @file Authentication reducers
 * @author Andrey Glotov
 */

import {
    AuthActionTypes,
    CLEAR_AUTH_ERROR,
    GET_USER_ERROR,
    GET_USER_SUCCESS,
    IAuthState,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    SET_AUTH_ERROR,
} from './types';

const initialState: IAuthState = {
    loggedIn: localStorage.getItem('loggedIn') === 'true',
    user: null,
    error: null,
};

/**
 * The authentication reducer
 *
 * @param state The current state
 * @param action The dispatched action
 */
export const authReducer = (
    state: IAuthState = initialState,
    action: AuthActionTypes,
) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loggedIn: true,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case GET_USER_ERROR:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggedIn: false,
                user: null,
            };
        case LOGIN_ERROR:
        case REGISTER_ERROR:
        case SET_AUTH_ERROR:
            return {
                ...state,
                loggedIn: false,
                error: action.payload.error,
            };
        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
