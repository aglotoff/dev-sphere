/**
 * @file Dropdown component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import classNames from 'classnames';
import React, { FC, ReactElement, Ref } from 'react';
import { CSSTransition } from 'react-transition-group';

// CSS Imports
import styles from './Dropdown.module.scss';

// Hooks Imports
import { useDropdown } from './hooks';

/**
 * Props injected by the Dropdown component into the button render function.
 */
export interface InjectedDropdownButtonProps {
    /** Ref to be attached to the button. */
    buttonRef: Ref<HTMLButtonElement>;
    /** Is the dropdown expanded?. */
    expanded: boolean;
}

/**
 * Props for the Dropdown component.
 */
export interface DropdownProps {
    /** Additional class name. */
    className?: string;
    /** ID attribute for the dropdown popup. */
    popupId?: string;

    /**
     * Render the contents of the dropdown toggle button.
     *
     * @param props The props injected by the Dropdown component.
     * @returns The element to render.
     */
    renderButton: (props: InjectedDropdownButtonProps) => ReactElement;
}

// Classes applied to the popup during transitions.
const transitionClasses = {
    enter: styles.popup_state_enter,
    enterActive: styles.popup_state_enterActive,
    enterDone: styles.popup_state_enterDone,
    exit: styles.popup_state_exit,
    exitActive: styles.popup_state_exitActive,
    exitDone: styles.popup_state_exitDone,
};

// Duration of fade in / fade out animations in ms.
const TRANSITION_DURATION = 200;

/**
 * Basic component to create dropdowns.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Dropdown: FC<DropdownProps> = ({
    children,
    className,
    popupId,
    renderButton,
}) => {
    const {
        buttonRef,
        dropdownRef,
        expanded,

        handleClick,
        handleKeyDown,
    } = useDropdown();

    const dropdownClass = classNames(
        styles.dropdown,
        className,
    );

    return (
        <div
            className={dropdownClass}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            ref={dropdownRef}
        >
            {renderButton({ buttonRef, expanded })}

            <CSSTransition
                classNames={transitionClasses}
                in={expanded}
                timeout={TRANSITION_DURATION}
            >
                <div className={styles.popup} id={popupId}>
                    {children}
                </div>
            </CSSTransition>
        </div>
    );
};
