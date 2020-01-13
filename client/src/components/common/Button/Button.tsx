import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { PropsWithChildren } from 'react';

import styles from './Button.module.scss';

export interface IButtonProps {
    /** Is the button disabled? */
    disabled?: boolean;

    /** Additional class name */
    className?: string;

    /** FontAwesome icon */
    icon?: IconDefinition;

    /** The type of the button */
    type?: 'button' | 'submit' | 'reset';

    theme?: 'default' | 'facebook' | 'google' | 'github';

    href?: string;

    /** Handle a click event on the button */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = (props: PropsWithChildren<IButtonProps>) => {
    const {
        children,
        href,
        icon,
        className,
        onClick,
        theme = 'default',
        type,
    } = props;

    const buttonClass = classnames(
        styles.button,
        className,
        styles['button_theme_' + theme],
    );

    if (href) {
        return (
            <a className={buttonClass} href={href}>
                {icon && <i><FontAwesomeIcon icon={icon} /></i>}
                <span className={styles.text}>{children}</span>
            </a>
        );
    } else {
        return (
            <button type={type} onClick={onClick} className={buttonClass}>
                {icon && <i><FontAwesomeIcon icon={icon} /></i>}
                <span className={styles.text}>{children}</span>
            </button>
        );
    }
};

export default Button;
