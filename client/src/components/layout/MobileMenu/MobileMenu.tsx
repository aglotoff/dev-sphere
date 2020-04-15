/**
 * @file Mobile Menu component.
 * @author Andrey Glotov
 */

// Imports
import {
    faBars,
    faSignOutAlt,
    faTimes,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import React, {
    FC,
    MouseEventHandler,
    PropsWithChildren,
    useState,
} from 'react';
import { NavLink } from 'react-router-dom';

// UI Imports
import { Thumbnail } from '../../common/Thumbnail';

// CSS Imports
import styles from './MobileMenu.module.scss';

/**
 * Props for the Mobile Menu Item component.
 */
export interface IMobileMenuItemProps {
    /** Optional icon to display before the text. */
    icon?: IconDefinition;
    /** Handle a click event (if the item is a button). */
    onClick?: MouseEventHandler;
    /** URL (if the item is a link). */
    url?: string;
}

/**
 * Mobile menu item, can be a link or a button.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const MobileMenuItem: FC<PropsWithChildren<IMobileMenuItemProps>> = ({
    children,
    icon,
    onClick,
    url,
}) => {
    const itemContent = (
        <>
            {icon && (
                <FontAwesomeIcon icon={icon} className={styles.itemIcon} />
            )}
            <span className={styles.itemText}>
                {children}
            </span>
        </>
    );

    return (
        <li className={styles.item}>
            {url ? (
                <NavLink to={url} className={styles.link}>
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

/**
 * Props for the Mobile Menu Profile Item component.
 */
export interface IMobileMenuProfileItemProps {
    /** User profile picture. */
    picture?: string;
    /** User profile URL. */
    url: string;
}

/**
 * User profile item of the Mobile Menu.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const MobileMenuProfileItem: FC<
    PropsWithChildren<IMobileMenuProfileItemProps>
> = ({ children, picture, url }) => (
    <li className={styles.item}>
        <NavLink
            className={classNames(styles.link, styles.link_profile)}
            to={url}
        >
            <Thumbnail
                className={styles.profileImage}
                size="xs"
                src={picture}
            />

            <span className={styles.itemText}>
                {children}
            </span>
        </NavLink>
    </li>
);

/**
 * Props for the Mobile Menu component.
 */
export interface IMobileMenuProps {
    /** Additional class name. */
    className?: string;
    /** Handle clicking on the logout menu item. */
    onLogout: () => void;
    /** The name of the user. */
    userName: string;
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
                        <MobileMenuProfileItem url="/">
                            {userName}
                        </MobileMenuProfileItem>
                        <MobileMenuItem url="/">
                            Home
                        </MobileMenuItem>
                        <MobileMenuItem url="/discussion">
                            Discussion
                        </MobileMenuItem>
                        <MobileMenuItem url="/weather">
                            Weather
                        </MobileMenuItem>
                        <MobileMenuItem url="/blog">
                            Blog
                        </MobileMenuItem>
                        <MobileMenuItem icon={faSignOutAlt} onClick={onLogout}>
                            Logout
                        </MobileMenuItem>
                    </ul>
                </li>
            </nav>
        </FocusTrap>
    );
};
