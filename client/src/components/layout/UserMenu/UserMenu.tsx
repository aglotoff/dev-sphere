/**
 * @file User Menu component.
 * @author Andrey Glotov
 */

// Imports
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { FC } from 'react';

// UI Imports
import { Dropdown, IInjectedDropdownButtonProps } from '../../common/Dropdown';
import { Menu, MenuItem } from '../../common/Menu';
import { Thumbnail } from '../../common/Thumbnail';

// CSS Imports
import styles from './UserMenu.module.scss';

/**
 * Props for the User Menu Toggle component.
 */
export type IUserMenuToggleProps = IInjectedDropdownButtonProps & {
    /** First name of the user. */
    firstName: string;
    /** User profile picture. */
    picture?: string;
};

/**
 * The contents of the User Menu toggle button.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const UserMenuToggle: FC<IUserMenuToggleProps> = ({
    buttonRef,
    expanded,
    firstName,
    picture,
}) => {
    const toggleClass = classNames(
        styles.toggle,
        expanded && styles.toggle_expanded,
    );

    return (
        <button className={toggleClass} ref={buttonRef}>
            <Thumbnail src={picture} />

            <span className={styles.name}>
               {firstName}
            </span>

            <i className={styles.arrow} aria-hidden="true">
                <FontAwesomeIcon icon={faAngleDown} />
            </i>
        </button>
    );
};

/**
 * Props for the User Menu component.
 */
export interface IUserMenuProps {
    /** Additional class name. */
    className?: string;
    /** The number of credits the user currently has. */
    credits: number;
    /** First name of the user. */
    firstName: string;
    /** Handle clicking on the logout menu item. */
    onLogout: () => void;
    /** User profile picture. */
    picture?: string;
}

/**
 * User dropdown menu displayed in the header on desktop screens.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const UserMenu: FC<IUserMenuProps> = ({
    className,
    credits,
    firstName,
    onLogout,
    picture,
}) => (
    <Dropdown
        popupId="account-menu"
        className={className}
        renderButton={({ buttonRef, expanded }) => (
            <UserMenuToggle
                buttonRef={buttonRef}
                expanded={expanded}
                firstName={firstName}
                picture={picture}
            />
        )}
    >
        <Menu>
            <MenuItem href="/profile">
                Profile
            </MenuItem>
            <MenuItem href="/messages">
                Messages
            </MenuItem>
            <MenuItem href="/booked-events">
                Booked Events
            </MenuItem>
            <MenuItem href="/credits" badge={`$${credits}`}>
                Credits
            </MenuItem>
            <MenuItem href="/settings">
                Settings
            </MenuItem>
            <MenuItem onClick={onLogout}>
                Logout
            </MenuItem >
        </Menu>
    </Dropdown>
);
