/**
 * @file Use URL Search Parameters hook.
 * @autor Andrey Glotov
 */

// Imports
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Parse the query string and return the result.
 *
 * @returns A URLSearchParams object instance.
 */
export const useURLSearchParams = () => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [ search ]);
};
