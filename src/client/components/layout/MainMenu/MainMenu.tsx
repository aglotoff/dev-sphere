/**
 * @file Main Menu component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import classNames from 'classnames';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

// CSS Imports
import styles from './MainMenu.module.scss';

const items = [{
    title: 'Home',
    href: '/',
    key: 'Home',
}, {
    title: 'Discussion',
    href: '/discussion',
    key: 'Discussion',
}, {
    title: 'Weather',
    href: '/weather',
    key: 'Weather',
}, {
    title: 'Blog',
    href: '/blog',
    key: 'Blog',
}];

/**
 * Props for the Main Menu component.
 */
export interface MainMenuProps {
    /** Additional class name. */
    className?: string;
}

/**
 * Application main menu (displayed only on desktop screens).
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const MainMenu: FC<MainMenuProps> = ({ className }) => {
    const menuClass = classNames(
        styles.menu,
        className,
    );

    return (
        <nav aria-label="Main Menu" className={menuClass}>
            <ul className={styles.list}>
                {items.map(({ href, key, title }) => (
                    <li key={key}>
                        <NavLink to={href} className={styles.link}>
                            {title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
