/**
 * @file Dropdown Menu Item component.
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
import styles from './DropdownMenu.module.scss';

/**
 * Props for the Dropdown Menu Item component.
 */
export interface IDropdownMenuItemProps {
    /** Text for an optional badge. */
    badge?: string;
    /** Target URL, if the item contains a link. */
    href?: string;
    /** Click event handler, if the item contains a button. */
    onClick?: MouseEventHandler;
}

/**
 * Dropdown Menu Item component.
 *
 * Components of this type are intended to be used as children of a Dropdown
 * Menu component. Depending on the passed props, an item can be either a link
 * or a button.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const DropdownMenuItem: FC<
    PropsWithChildren<IDropdownMenuItemProps>
> = ({
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
                    to={href}
                    className={styles.link}
                    activeClassName={styles.link_active}
                >
                    {itemContent}
                </NavLink>
            ) : (
                <button className={styles.link} onClick={onClick}>
                    {itemContent}
                </button>
            )}
        </li>
    );
};
