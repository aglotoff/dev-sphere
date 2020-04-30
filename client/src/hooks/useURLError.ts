/**
 * @file Use URL Error hook.
 * @aithor Andrey Glotov
 */

// Imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// App Imports
import { clearError, setError } from '../store/actions/error';
import { getErrorMessage } from '../store/reducers/error';

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
    const errorMessage = useSelector(getErrorMessage);

    // Error from the query sttring
    const urlSearchParams = useURLSearchParams();
    const urlError = urlSearchParams.get('error');

    const dispatch = useDispatch();

    useEffect(() => {
        if (urlError) {
            dispatch(setError(new Error(urlError)));
        }

        return () => {
            dispatch(clearError());
        };
    }, [ dispatch, urlError ]);

    return errorMessage;
};
