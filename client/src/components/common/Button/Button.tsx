/**
 * @file Button component.
 * @author Andrey Glotov
 */

import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, {
    EventHandler,
    FC,
    PropsWithChildren,
    SyntheticEvent,
} from 'react';

import styles from './Button.module.scss';

/**
 * Props for the Button component.
 */
export interface IButtonProps {
    /** Is the button disabled? */
    disabled?: boolean;
    /** Additional class name. */
    className?: string;
    /** Optiona FontAwesome icon. */
    icon?: IconDefinition;
    /** The type of the button. */
    type?: 'button' | 'submit' | 'reset';
    /** Button size. */
    size?: 'sm' | 'md' | 'lg';
    /** Button theme. */
    theme?: 'default' | 'facebook' | 'google' | 'github';
    /** Target URL (if this is a link). */
    href?: string;
    /** Handler for a click event. */
    onClick?: EventHandler<SyntheticEvent>;
    /** Make sharp corners instead of rounded ones? */
    sharp?: boolean;
}

/**
 * Button with predefined styles and sizes.
 */
const Button: FC<PropsWithChildren<IButtonProps>> = ({
    children,
    href,
    icon,
    className,
    onClick,
    theme = 'default',
    sharp = false,
    size = 'md',
    type,
}) => {
    const buttonClass = classnames(
        styles.button,
        className,
        sharp && styles.button_sharp,
        styles['button_theme_' + theme],
        styles['button_size_' + size],
    );

    const buttonContent = (
        <>
            {icon && <i>
                <FontAwesomeIcon
                    icon={icon}
                    className={styles.icon}
                />
            </i>}
            <span className={styles.text}>{children}</span>
        </>
    );

    if (href) {
        return (
            <a className={buttonClass} href={href}>
                {buttonContent}
            </a>
        );
    } else {
        return (
            <button type={type} onClick={onClick} className={buttonClass}>
                {buttonContent}
            </button>
        );
    }
};

export default Button;
