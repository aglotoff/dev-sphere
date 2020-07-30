/**
 * @file Current user state types, action constants and shapes.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

import { Action } from 'redux';

export const FETCH_USER_SUCCESS = '@user/FETCH_USER_SUCCESS';
export const SET_USER = '@user/SET_USER';

/**
 * Format of the User profile.
 */
export interface User {
    /** User ID. */
    id: string;
    /** Full user name. */
    fullName: string;
}

export interface FetchUserSuccessAction extends Action<
    typeof FETCH_USER_SUCCESS
> {
    payload: User;
}

export interface SetUserAction extends Action<typeof SET_USER> {
    payload: User;
}

/**
 * All possible user actions.
 */
export type UserActionTypes =
    | FetchUserSuccessAction
    | SetUserAction;
