import qs from 'query-string';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { clearAuthError, setAuthError } from '../store/actions/api';
import { getAuthError } from '../store/reducers/api';

export default function useAuthError() {
    const dispatch = useDispatch();
    const errorMessage = useSelector(getAuthError);

    const location = useLocation();

    useEffect(() => {
        const { error } = qs.parse(location.search);
        if ((typeof error === 'string') && error) {
            dispatch(setAuthError(error));
        }

        // Clear error when navigating to another page.
        return () => {
            dispatch(clearAuthError());
        };
    }, [ dispatch, location.search ]);

    return [
        errorMessage,
        () => { dispatch(clearAuthError()); },
    ] as const;
}
