/**
 * @file User action creators.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// App Imports
import { apiAction } from './api';
import {
    FETCH_USER_SUCCESS,
    User,
    SET_USER,
    SetUserAction,
} from '../types/user';

/**
 * Create an action to fetch the current user.
 *
 * This action is automatically dispatched by the application after a
 * successful login.
 *
 * @returns An action to fetch the current user.
 */
export const fetchUser = () => apiAction({
    endpoint: '/auth/user',
    method: 'GET',
    statusHandlers: {
        success: FETCH_USER_SUCCESS,
    },
});

/**
 * Create an action to set the current user uring server-side rendering.
 *
 * @returns An action to set the current user.
 */
export const setUser = (user: User): SetUserAction => ({
    type: SET_USER,
    payload: user,
});
