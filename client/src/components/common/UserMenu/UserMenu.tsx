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
import { Dropdown, IInjectedDropdownToggleProps } from '../Dropdown';
import { DropdownMenu, DropdownMenuItem } from '../DropdownMenu';
import { Thumbnail } from '../Thumbnail';

// CSS Imports
import styles from './UserMenu.module.scss';

/**
 * Props for the User Menu Toggle component.
 */
export type IUserMenuToggleProps = IInjectedDropdownToggleProps & {
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
    expanded,
    firstName,
    picture,
}) => {
    const toggleClass = classNames(
        styles.toggle,
        expanded && styles.toggle_expanded,
    );

    return (
        <span className={toggleClass}>
            <Thumbnail src={picture} />

            <span className={styles.name}>
               {firstName}
            </span>

            <i className={styles.arrow} aria-hidden="true">
                <FontAwesomeIcon icon={faAngleDown} />
            </i>
        </span>
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
        id="account-menu"
        className={className}
        renderToggle={({ expanded }) => (
            <UserMenuToggle
                expanded={expanded}
                firstName={firstName}
                picture={picture}
            />
        )}
    >
        <DropdownMenu>
            <DropdownMenuItem href="/profile">
                Profile
            </DropdownMenuItem>
            <DropdownMenuItem href="/messages">
                Messages
            </DropdownMenuItem>
            <DropdownMenuItem href="/booked-events">
                Booked Events
            </DropdownMenuItem>
            <DropdownMenuItem href="/credits" badge={`$${credits}`}>
                Credits
            </DropdownMenuItem>
            <DropdownMenuItem href="/settings">
                Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>
                Logout
            </DropdownMenuItem >
        </DropdownMenu>
    </Dropdown>
);
