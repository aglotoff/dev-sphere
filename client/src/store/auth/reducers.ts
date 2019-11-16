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
} from './types';

const initialState: IAuthState = {
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
        case GET_USER_SUCCESS:
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case GET_USER_ERROR:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
            };
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            return {
                ...state,
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
