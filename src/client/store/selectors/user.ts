/**
 * @file Selectors for the user state.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// App Imports
import { AppState } from '../index';

/**
 * Get the current application user.
 *
 * @param state The application state.
 * @returns The current user or null if the user is logged out.
 */
export const getCurrentUser = (state: AppState) => state.user.current;
