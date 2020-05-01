/**
 * @file Header Button component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import { NavLink } from 'react-router-dom';

// CSS Imports
import styles from './HeaderButton.module.scss';

/**
 * Props for the Header Button component.
 */
export interface IHeaderButtonProps extends HTMLAttributes<HTMLElement> {
    /** Apply the highlighted class. */
    highlighted?: boolean;
    /** Target URL (if this is a link). */
    href?: string;
    /** The Font Awesome icon. */
    icon: IconDefinition;
    /** Show an indicator in the corner of the box. */
    showIndicator?: boolean;
    /** Title to make the icon accessible. */
    title: string;
}

/**
 * Button which displays an icon with optional circular indicator in the
 * corner.
 *
 * If the href prop is specified, renders an anchor element, otherwise renders
 * a button element.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const HeaderButton = forwardRef<HTMLElement, IHeaderButtonProps>((
    { className, highlighted, href, icon, showIndicator, title, ...restProps },
    forwardedRef,
) => {
    const buttonClass = classNames(
        styles.button,
        highlighted && styles.button_highlighted,
        showIndicator && styles.button_showIndicator,
        className,
    );

    const iconBox = (
        <span className={styles.iconBox}>
            <FontAwesomeIcon
                className={styles.icon}
                icon={icon}
                title={title}
            />
        </span>
    );

    return href ? (
        <NavLink
            className={buttonClass}
            innerRef={forwardedRef as Ref<HTMLAnchorElement>}
            to={href}
            {...restProps}
        >
            {iconBox}
        </NavLink>
    ) : (
        <button
            className={buttonClass}
            ref={forwardedRef as Ref<HTMLButtonElement>}
            {...restProps}
        >
            {iconBox}
        </button>
    );
});
