/**
 * @file useDropdown hook.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import {
    KeyboardEventHandler,
    MouseEventHandler,
    Ref,
    useEffect,
    useRef,
    useState,
} from 'react';

/**
 * State of the dropdown component.
 */
export interface IDropdown {
    /** Ref to be attached to the dropdown button. */
    buttonRef: Ref<HTMLButtonElement>;
    /** Ref to be attached to the dropdown container. */
    dropdownRef: Ref<HTMLDivElement>;
    /** Is the dropdown expanded? */
    expanded: boolean;

    /** Callback to be executed on the click event. */
    handleClick: MouseEventHandler;
    /** Callback to be executed on the keydown event. */
    handleKeyDown: KeyboardEventHandler;
}

/**
 * Behavior of the Dropdown component.
 *
 * @returns The state of the Dropdown component.
 */
export function useDropdown(): IDropdown {
    const [ expanded, setExpanded ] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // When the dropdown is expanded, attach an event listener to automatically
    // collapse it when clicking outside of the container.
    useEffect(() => {
        if (expanded) {
            const handleOutsideClick = (event: Event) => {
                const { target } = event;

                if (
                    (target !== document)
                    && (target instanceof HTMLElement)
                    && dropdownRef.current
                    && !dropdownRef.current.contains(target)
                ) {
                    setExpanded(false);
                }
            };

            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('focusin', handleOutsideClick);

            if (dropdownRef.current) {
                dropdownRef.current.focus();
            }

            return () => {
                document.removeEventListener('click', handleOutsideClick);
                document.removeEventListener('focusin', handleOutsideClick);
            };
        }
    }, [ expanded ]);

    // Expand/collapse the dropdown on mouse click.
    const handleClick: MouseEventHandler = (event) => {
        event.preventDefault();
        setExpanded(!expanded);
    };

    // Collapse the dropdown when the escape key is pressed.
    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (event.key === 'Escape') {
            setExpanded(false);

            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }
    };

    return {
        buttonRef,
        dropdownRef,
        expanded,

        handleClick,
        handleKeyDown,
    };
}
