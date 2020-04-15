/**
 * @file Menu Item component.
 * @author Andrey Glotov
 */

// Imports
import React, {
    FC,
    MouseEventHandler,
    PropsWithChildren,
} from 'react';
import { NavLink } from 'react-router-dom';

// CSS Imports
import styles from './Menu.module.scss';

/**
 * Props for the Menu Item component.
 */
export interface IMenuItemProps {
    /** Text for an optional badge. */
    badge?: string;
    /** Target URL, if the item contains a link. */
    href?: string;

    /** Callback fired when the menu item is clicked. */
    onClick?: MouseEventHandler;
}

/**
 * Menu Item component.
 *
 * Depending on the passed props, renders either a link or a button.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const MenuItem: FC<PropsWithChildren<IMenuItemProps>> = ({
    badge,
    children,
    href,
    onClick,
}) => {
    const itemContent = (
        <>
            <span>{children}</span>
            {badge && <span className={styles.badge}>{badge}</span>}
        </>
    );

    return (
        <li>
            {href ? (
                <NavLink
                    activeClassName={styles.link_active}
                    className={styles.link}
                    onClick={onClick}
                    to={href}
                >
                    {itemContent}
                </NavLink>
            ) : (
                <button
                    className={styles.link}
                    onClick={onClick}
                    type="button"
                >
                    {itemContent}
                </button>
            )}
        </li>
    );
};
