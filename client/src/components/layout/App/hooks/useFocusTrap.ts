/**
 * @file Use Focus Trap hook.
 * @author Andrey Glotov
 */

import { useEffect } from 'react';

/**
 * Utility to handle focus styles for accessibility users.
 *
 * When the user tabs to an element on the page, add a special utility class to
 * the root HTML element, and use CSS cascade to add specific styles to the
 * currently active element.
 *
 * @param className The class to be applied to the HTML element.
 */
export const useFocusTrap = (className: string) => {
    useEffect(() => {
        // Detect tab key press event and apply the focus utility class to the
        // root element.
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Tab') {
                document.documentElement.classList.add(className);

                document.addEventListener('mousedown', handleMouseDown, false);
                document.removeEventListener('keydown', handleKeyDown, false);
            }
        }

        // Detect mouse down event and remove the focus utility class when
        // clicked outside of the active element.
        function handleMouseDown(e: MouseEvent) {
            const activeElement = document.activeElement;
            if (!activeElement) {
                return;
            }

            const target = e.target as Node;
            if ((target === document) || activeElement.contains(target)) {
                return;
            }

            document.documentElement.classList.remove(className);

            document.addEventListener('keydown', handleKeyDown, false);
            document.removeEventListener('mousedown', handleMouseDown, false);
        }

        document.addEventListener('keydown', handleKeyDown, false);

        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
            document.removeEventListener('mousedown', handleMouseDown, false);
        };
    }, [ className ]);
};
