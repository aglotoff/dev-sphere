/**
 * @file Use URL Error hook.
 * @aithor Andrey Glotov
 */

// Imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// App Imports
import { clearAuthError, setAuthError } from '../store/actions/api';
import { getAuthError } from '../store/reducers/api';

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
    const authError = useSelector(getAuthError);

    // Error from the query sttring
    const urlSearchParams = useURLSearchParams();
    const urlError = urlSearchParams.get('error');

    const dispatch = useDispatch();

    useEffect(() => {
        if (urlError) {
            dispatch(setAuthError(urlError));
        }

        return () => {
            dispatch(clearAuthError());
        };
    }, [ dispatch, urlError ]);

    return authError;
};
