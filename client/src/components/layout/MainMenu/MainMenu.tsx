/**
 * @file Main Menu component.
 * @author Andrey Glotov
 */

// Imports
import classNames from 'classnames';
import React, { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

// CSS Imports
import styles from './MainMenu.module.scss';

/**
 * Props for the Main Menu Item component.
 */
export interface IMainMenuItemProps {
    /** The URL where the menu item points to. */
    url: string;
}

/**
 * Main Menu Item.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const MainMenuItem: FC<PropsWithChildren<IMainMenuItemProps>> = ({
    children,
    url,
}) => (
    <li>
        <NavLink to={url} className={styles.link}>
            {children}
        </NavLink>
    </li>
);

/**
 * Props for the Main Menu component.
 */
export interface IMainMenuProps {
    /** Additional class name. */
    className?: string;
}

/**
 * Application main menu (displayed only on desktop screens).
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const MainMenu: FC<IMainMenuProps> = ({ className }) => {
    const menuClass = classNames(
        styles.menu,
        className,
    );

    return (
        <nav className={menuClass}>
            <ul className={styles.list}>
                <MainMenuItem url="/">
                    Home
                </MainMenuItem>
                <MainMenuItem url="/discussion">
                    Discussion
                </MainMenuItem>
                <MainMenuItem url="/weather">
                    Weather
                </MainMenuItem>
                <MainMenuItem url="/blog">
                    Blog
                </MainMenuItem>
            </ul>
        </nav>
    );
};
