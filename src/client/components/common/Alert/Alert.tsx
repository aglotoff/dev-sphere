/**
 * @file Alert Box component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { FC, MouseEventHandler, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

// CSS Imports
import styles from './Alert.module.scss';

/**
 * Props for the Alert Box component.
 */
export interface IAlertProps {
    /** Additional class name. */
    className?: string;
    /** Appearance theme. */
    theme?: 'error';

    /** Callback fired after dismissing the alert box. */
    onDismiss?: () => void;
}

// Classes applied to the component during transitions.
const transitionClasses = {
    appear: styles.alert_state_appear,
    appearActive: styles.alert_state_appearActive,
    appearDone: styles.alert_state_appearDone,
    enter: styles.alert_state_enter,
    enterActive: styles.alert_state_enterActive,
    enterDone: styles.alert_state_enterDone,
    exit: styles.alert_state_exit,
    exitActive: styles.alert_state_exitActive,
    exitDone: styles.alert_state_exitDone,
};

// Duration of fade in / fade out animations in ms.
const TRANSITION_DURATION = 200;

/**
 * Message box with dismiss button.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const Alert: FC<IAlertProps> = ({
    children,
    className,
    onDismiss,
    theme = 'error',
}) => {
    const [ visible, setVisible ] = useState(true);

    const handleCloseClick: MouseEventHandler = (e) => {
        // Prevent from submitting when used inside forms
        e.preventDefault();

        setVisible(false);
    };

    const alertClass = classNames(
        styles.alert,
        styles[`alert_theme_${theme}`],
        className,
    );

    return (
        <CSSTransition
            appear
            classNames={transitionClasses}
            in={visible}
            onExited={onDismiss}
            timeout={TRANSITION_DURATION}
            unmountOnExit
        >
            <div
                aria-live="assertive"
                className={alertClass}
                role="alertdialog"
            >
                <div>
                    {children}
                </div>

                <button
                    className={styles.close}
                    onClick={handleCloseClick}
                    type="button"
                >
                    <FontAwesomeIcon icon={faTimes} title="Close Alert" />
                </button>
            </div>
        </CSSTransition>
    );
};
