/**
 * @file Mobile Menu component.
 * @author Andrey Glotov
 */

// Imports
import {
    faBars,
    faSignOutAlt,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import React, {
    FC,
    MouseEventHandler,
    useState,
} from 'react';
import { NavLink } from 'react-router-dom';

// UI Imports
import { Thumbnail } from '../../common/Thumbnail';

// CSS Imports
import styles from './MobileMenu.module.scss';

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
 * Props for the Mobile Menu component.
 */
export interface IMobileMenuProps {
    /** Additional class name. */
    className?: string;
    /** The name of the user. */
    userName: string;

    /** Callback fired when the user selects the logout menu item. */
    onLogout: () => void;
}

/**
 * Main applicaton menu displayed only on mobile screens.
 *
 * When the menu is opened, focus is trapped inside until the menu is closed by
 * either selecting an item, pressing Escape, or clicking outside.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const MobileMenu: FC<IMobileMenuProps> = ({
    className,
    onLogout,
    userName,
}) => {
    const [ expanded, setExpanded ] = useState(false);

    // Toggle between collapsed and expanded state when the button is clicked.
    const handleToggleClick: MouseEventHandler = () => {
        setExpanded(!expanded);
    };

    // Collapse the menu when an item is selected.
    const handleListClick: MouseEventHandler = () => {
        setExpanded(false);
    };

    const menuClass = classNames(
        styles.menu,
        className,
    );
    const containerClass = classNames(
        styles.container,
        expanded && styles.container_expanded,
    );

    return (
        <FocusTrap active={expanded} focusTrapOptions={{
            escapeDeactivates: true,
            clickOutsideDeactivates: true,
            onDeactivate: () => setExpanded(false),
        }}>
            <nav className={menuClass}>
                <button className={styles.toggle} onClick={handleToggleClick}>
                    <FontAwesomeIcon
                        aria-controls="mobile-menu"
                        aria-expanded={expanded}
                        aria-haspopup="true"
                        className={styles.toggleIcon}
                        icon={expanded ? faTimes : faBars}
                        title={expanded ? 'Close menu' : 'Open menu'}
                    />
                </button>

                <li className={containerClass}>
                    <ul className={styles.list} onClick={handleListClick}>
                        <li className={styles.item} key="Profile">
                            <NavLink
                                className={classNames(
                                    styles.link,
                                    styles.link_profile,
                                )}
                                to="/profile"
                            >
                                <Thumbnail
                                    className={styles.profileImage}
                                    size="xs"
                                />
                                {userName}
                            </NavLink>
                        </li>

                        {items.map(({ href, key, title }) => (
                            <li className={styles.item} key={key} >
                                <NavLink to={href} className={styles.link}>
                                    {title}
                                </NavLink>
                            </li>
                        ))}

                        <li className={styles.item} key="Logout">
                            <button className={styles.link} onClick={onLogout}>
                                <span
                                    aria-hidden="true"
                                    className={styles.itemIcon}
                                >
                                    <FontAwesomeIcon
                                        className={styles.itemIcon}
                                        icon={faSignOutAlt}
                                    />
                                </span>

                                Logout
                            </button>
                        </li>
                    </ul>
                </li>
            </nav>
        </FocusTrap>
    );
};
