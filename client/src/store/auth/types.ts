/**
 * @file Authentication state and action types
 * @author Andrey Glotov
 */

/**
 * Current application user
 */
export interface IUser {
    /** User ID */
    id: string;

    /** Full user name */
    fullName: string;
}

/**
 * User login credentials
 */
export interface ILoginData {
    /** User email */
    email: string;

    /** User password */
    password: string;
}

/**
 * Registration request payload
 */
export interface IRegisterData {
    /** Full user name */
    fullName: string;

    /** User email */
    email: string;

    /** User password */
    password: string;
}

/**
 * Authentication reducer's slice of state
 */
export interface IAuthState {
    /** Is the user logged in? */
    loggedIn: boolean;

    /** Current application user */
    user: IUser | null;

    /** Last error message */
    error: string | null;
}

/**
 * Action types
 */
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
export const REGISTER_ERROR = 'auth/REGISTER_ERROR';
export const GET_USER_SUCCESS = 'auth/GET_USER_SUCCESS';
export const GET_USER_ERROR = 'auth/GET_USER_ERROR';
export const CLEAR_AUTH_ERROR = 'auth/CLEAR_AUTH_ERROR';
export const SET_AUTH_ERROR = 'auth/SET_AUTH_ERROR';

/**
 * Shape of the Login request success action
 */
export interface ILoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: IUser;
}

/**
 * Shape of the Login request error action
 */
export interface ILoginErrorAction {
    type: typeof LOGIN_ERROR;
    payload: {
        /** Error message */
        error: string,
    };
}

/**
 * Shape of the Logout request success action
 */
export interface ILogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
}

/**
 * Shape of the Registration request success action
 */
export interface IRegisterSuccessAction {
    type: typeof REGISTER_SUCCESS;
    payload: IUser;
}

/**
 * Shape of the Registration request error action
 */
export interface IRegisterErrorAction {
    type: typeof REGISTER_ERROR;
    payload: {
        /** Error message */
        error: string,
    };
}

/**
 * Shape of the Get user request success action
 */
export interface IGetUserSuccessAction {
    type: typeof GET_USER_SUCCESS;
    payload: IUser;
}

/**
 * Shape of the Get user request error action
 */
export interface IGetUserErrorAction {
    type: typeof GET_USER_ERROR;
    payload: {
        /** Error message */
        error: string,
    };
}

/**
 * Shape of the Set authentication error action
 */
export interface ISetAuthErrorAction {
    type: typeof SET_AUTH_ERROR;
    payload: {
        /** Error message */
        error: string,
    };
}

/**
 * Shape of the Clear authentication error action
 */
export interface IClearAuthErrorAction {
    type: typeof CLEAR_AUTH_ERROR;
}

/**
 * All possible authentication actions
 */
export type AuthActionTypes =
    | ILoginSuccessAction
    | ILoginErrorAction
    | ILogoutSuccessAction
    | IRegisterSuccessAction
    | IRegisterErrorAction
    | IGetUserSuccessAction
    | IGetUserErrorAction
    | IClearAuthErrorAction
    | ISetAuthErrorAction;
