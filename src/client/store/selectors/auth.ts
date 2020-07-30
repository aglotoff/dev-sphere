/**
 * @file Selectors for the authentication state.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// App Imports
import { AppState } from '../index';

/**
 * Get the API access token.
 *
 * @param state The application state.
 * @returns The access token or null if the user is logged out.
 */
export const getAccessToken = (state: AppState) => (
    state.auth.accessToken
);

/**
 * Get authentication request error.
 *
 * @param state The application state.
 * @returns Error for the last authentication request or null if no error.
 */
export const getAuthError = (state: AppState) => (
    state.auth.error
);

/**
 * Determine whether a login or registration request is in progress.
 *
 * @param state The application state.
 * @returns true if an authentication request is in progress; false otherwise.
 */
export const getIsAuthenticating = (state: AppState) => (
    state.auth.isAuthenticating
);

/**
 * Determine whether the user is loggen in.
 *
 * @param state The application state.
 * @returns true if the user is loggen in; false otherwise.
 */
export const getIsLoggedIn = (state: AppState) => (
    state.auth.accessToken !== null
);

/**
 * Determine whether the user is loggen out.
 *
 * @param state The application state.
 * @returns true if the user is loggen out; false otherwise.
 */
export const getIsLoggedOut = (state: AppState) => (
    state.auth.accessToken === null
);

/**
 * Determine whether a refresh token request is in progress.
 *
 * @param state The application state.
 * @returns true if a refresh token request is in progress; false otherwise.
 */
export const getIsRefreshingToken = (state: AppState) => (
    state.auth.isRefreshingToken
);
