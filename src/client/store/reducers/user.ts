/**
 * @file Current user reducer.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { Reducer, combineReducers } from 'redux';

// App Imports
import {
    FETCH_USER_SUCCESS,
    SET_USER,
    User,
    UserActionTypes,
} from '../types/user';

/**
 * Store the current application user.
 *
 * @param state The current state.
 * @param action The action being dispatched.
 * @returns New state.
 */
export const current: Reducer<User | null, UserActionTypes> = (
    state = null,
    action,
) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
        case SET_USER:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    current,
});
