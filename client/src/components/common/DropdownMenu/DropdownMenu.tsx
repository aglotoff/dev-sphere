/**
 * @file Dropdown menu component.
 * @author Andrey Glotov
 */

import React, {
    EventHandler,
    FC,
    PropsWithChildren,
    SyntheticEvent,
} from 'react';
import { NavLink } from 'react-router-dom';

import styles from './DropdownMenu.module.scss';

/**
 * Props for the dropdown menu item component.
 */
export interface IDropdownMenuItemProps {
    /** Target URL, if the item contains a link. */
    href?: string;
    /** Optional label. */
    label?: string;
    /** Click event handler, if the item contains a button. */
    onClick?: EventHandler<SyntheticEvent>;
}

/**
 * Dropdown menu item.
 */
const DropdownMenuItem: FC<PropsWithChildren<IDropdownMenuItemProps>> = ({
    children,
    href,
    label,
    onClick,
}) => {
    let linkElement;
    if (href) {
        linkElement = (
            <NavLink
                to={href}
                className={styles.link}
                activeClassName={styles.link_active}
            >
                <span>{children}</span>
                {label && <span className={styles.label}>{label}</span>}
            </NavLink>
        );
    } else {
        linkElement = (
            <button
                onClick={onClick}
                className={styles.link}
            >
                <span>{children}</span>
                {label && <span className={styles.label}>{label}</span>}
            </button>
        );
    }

    return (
        <li>
            {linkElement}
        </li>
    );
};

type IDropdownMenu = FC<PropsWithChildren<{}>> & {
    Item: typeof DropdownMenuItem;
};

/**
 * Dropdown menu.
 */
const DropdownMenu: IDropdownMenu = ({ children }) => (
    <ul className={styles.menu}>
        {children}
    </ul>
);
DropdownMenu.Item = DropdownMenuItem;

export {
    DropdownMenu as default,
    DropdownMenuItem,
};
