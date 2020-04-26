/**
 * @file Button component.
 * @author Andrey Glotov
 */

// Imports
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, {
    FC,
    MouseEventHandler,
    PropsWithChildren,
} from 'react';

// CSS Imports
import styles from './Button.module.scss';

/**
 * Props for the Button component.
 */
export interface IButtonProps {
    /** Animate the spinner icon? */
    animateSpinner?: boolean;
    /** Is the button disabled? */
    disabled?: boolean;
    /** Additional class name. */
    className?: string;
    /** Target URL (if this is a link). */
    href?: string;
    /** Optional FontAwesome icon. */
    icon?: IconDefinition;
    /** The type of the button ('button' by default). */
    type?: 'button' | 'submit' | 'reset';
    /** Button size ('md' by default). */
    size?: 'sm' | 'md' | 'lg';
    /** Appearance theme. */
    theme?: 'default' | 'facebook' | 'google' | 'github';
    /** Make top corners sharp instead of rounded ones? */
    sharpTop?: boolean;

    /** Callback fired when the button is clicked. */
    onClick?: MouseEventHandler;
}

/**
 * Button with predefined styles and sizes.
 *
 * If the href prop is present, the component renders a link styled as a
 * button. Otherwise a true button element is rendered.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Button: FC<PropsWithChildren<IButtonProps>> = ({
    animateSpinner,
    children,
    disabled,
    href,
    icon,
    className,
    onClick,
    theme = 'default',
    sharpTop = false,
    size = 'md',
    type,
}) => {
    const buttonClass = classnames(
        styles.button,
        className,
        sharpTop && styles.button_sharpTop,
        animateSpinner && styles.button_animateSpinner,
        styles['button_theme_' + theme],
        styles['button_size_' + size],
    );

    const buttonContent = (
        <>
            {icon && (
                <i>
                    <FontAwesomeIcon icon={icon} className={styles.icon} />
                </i>
            )}
            <span className={styles.text}>
                {children}
            </span>
        </>
    );

    if (href) {
        return (
            <a className={buttonClass} href={href} onClick={onClick}>
                {buttonContent}
            </a>
        );
    } else {
        return (
            <button
                className={buttonClass}
                disabled={disabled}
                onClick={onClick}
                type={type}
            >
                {buttonContent}
            </button>
        );
    }
};
