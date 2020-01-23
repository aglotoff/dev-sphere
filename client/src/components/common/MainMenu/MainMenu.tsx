/**
 * @file Main menu component.
 * @author Andrey Glotov
 */

import React, { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './MainMenu.module.scss';

/**
 * Props for the main menu item component.
 */
export interface IMainMenuItemProps {
    /** The URL menu item points to. */
    href: string;
}

/**
 * Main menu item.
 */
const MainMenuItem: FC<PropsWithChildren<IMainMenuItemProps>> = ({
    children,
    href,
}) => (
    <li>
        <NavLink to={href} className={styles.link}>
            {children}
        </NavLink>
    </li>
);

/**
 * Props for the Main menu component.
 */
interface IMainMenuProps {
    /** Additional class name. */
    className?: string;
}

type IMainMenu = FC<PropsWithChildren<IMainMenuProps>> & {
    Item: typeof MainMenuItem;
};

/**
 * Main application menu.
 */
const MainMenu: IMainMenu = ({ children, className }) => (
    <nav className={className}>
        <ul className={styles.list}>
            { children}
        </ul>
    </nav>
);
MainMenu.Item = MainMenuItem;

export {
    MainMenu as default,
    MainMenuItem,
};
