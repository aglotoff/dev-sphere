/**
 * @file Use URL Error hook.
 * @aithor Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// App Imports
import { clearAuthError, setAuthError } from '../store/actions/auth';
import { getAuthError } from '../store/selectors/auth';

// Hooks Imports
import { useURLSearchParams } from './useURLSearchParams';

/**
 * Get error message from the URL query string and store inside the app state.
 *
 * Useful for pages the user is redirected to during social login. Clears the
 * error state when the component is unmounted.
 *
 * @return The error message or null if there is no error.
 */
export const useURLError = () => {
    // Error from the store
    const error = useSelector(getAuthError);

    // Error from the query sttring
    const urlSearchParams = useURLSearchParams();
    const urlErrorMessage = urlSearchParams.get('error');

    const dispatch = useDispatch();

    useEffect(() => {
        if (urlErrorMessage) {
            dispatch(setAuthError(new Error(urlErrorMessage)));
        }

        return () => {
            dispatch(clearAuthError());
        };
    }, [ dispatch, urlErrorMessage ]);

    return error;
};
