/**
 * @file Use Scroll Restore hook.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Scroll to the top of the window when the component is mounted.
 *
 * Useful when navigating between sections and pages.
 */
export const useScrollRestore = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [ pathname ]);
};
