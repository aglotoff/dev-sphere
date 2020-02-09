/**
 * @file Dropdown component.
 * @author Andrey Glotov
 */

// Imports
import classNames from 'classnames';
import React, {
    FC,
    KeyboardEventHandler,
    MouseEventHandler,
    PropsWithChildren,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from 'react';

// CSS imports
import styles from './Dropdown.module.scss';

/**
 * Props injected by the Dropdown component into the toggle render function.
 */
export interface IInjectedDropdownToggleProps {
    /** Current expanded state. */
    expanded: boolean;
}

/**
 * Props for the Dropdown component.
 */
export interface IDropdownProps {
    /** Additional class name. */
    className?: string;
    /** ID attribute. */
    id?: string;
    /**
     * Render the contents of the dropdown toggle button.
     *
     * @param props The props injected by the Dropdown component.
     * @returns The element to render.
     */
    renderToggle: (props: IInjectedDropdownToggleProps) => ReactElement;
}

/**
 * Basic component to create dropdowns.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Dropdown: FC<PropsWithChildren<IDropdownProps>> = ({
    children,
    className,
    id,
    renderToggle,
}) => {
    const [ expanded, setExpanded ] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);

    // When the dropdown is expanded, attach an event listener to automatically
    // collapse it when clicking outside.
    useEffect(() => {
        if (expanded) {
            const handleOutsideClick = (event: Event) => {
                const { target } = event;

                if (
                    (target !== document) &&
                    (target instanceof HTMLElement) &&
                    !dropdownRef.current!.contains(target)
                ) {
                    setExpanded(false);
                }
            };

            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('focusin', handleOutsideClick);

            dropdownRef.current!.focus();

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
            toggleRef.current!.focus();
        }
    };

    const dropdownClass = classNames(
        styles.dropdown,
        className,
    );
    const popupClass = classNames(
        styles.popup,
        expanded && styles.popup_expanded,
    );

    return (
        <div
            className={dropdownClass}
            onClick={handleClick}
            ref={dropdownRef}
        >
            <button
                className={styles.toggle}
                aria-haspopup="true"
                aria-expanded={expanded}
                aria-controls={id}
                ref={toggleRef}
            >
                {renderToggle({ expanded })}
            </button>

            <div
                className={popupClass}
                id={id}
                onKeyDown={handleKeyDown}
            >
                {children}
            </div>
        </div>
    );
};
