/**
 * @file Use Automatic Login hook.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// App Imports
import {
    checkLogin,
    getUser as fetchUser,
} from '../../../../store/actions/api';
import {
    getIsLoggedIn,
    getIsLoginChecked,
    getUser,
} from '../../../../store/reducers/api';

/**
 * Try to automatically login the user when the application is loaded.
 *
 * Fetches the user information after each successful login.
 *
 * @returns true if the automatic login check has been already performed; false
 *  otherwise.
 */
export const useAutomaticLogin = () => {
    const dispatch = useDispatch();

    const loggedIn = useSelector(getIsLoggedIn);
    const loginChecked = useSelector(getIsLoginChecked);
    const user = useSelector(getUser);

    useEffect(() => {
        if (!loginChecked) {
            dispatch(checkLogin());
        }
    }, [ dispatch, loginChecked ]);

    useEffect(() => {
        if (loggedIn && (user === null)) {
            dispatch(fetchUser());
        }
    }, [ loggedIn, dispatch ]);

    return { loggedIn, user };
};
