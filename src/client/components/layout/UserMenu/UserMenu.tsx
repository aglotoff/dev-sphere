/**
 * @file User Menu component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
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

const POPUP_ID = 'user-menu';

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
        <button
            aria-controls={POPUP_ID}
            aria-expanded={expanded}
            aria-haspopup="true"
            className={toggleClass}
            ref={buttonRef}
            type="button"
        >
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
    /** User profile picture. */
    picture?: string;

    /** Callback fired when users select the logout menu item. */
    onLogout: () => void;
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
        popupId={POPUP_ID}
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
            <MenuItem href="/profile" key="Propfile">
                Profile
            </MenuItem>
            <MenuItem href="/messages" key="Messages">
                Messages
            </MenuItem>
            <MenuItem href="/booked-events" key="Booked Events">
                Booked Events
            </MenuItem>
            <MenuItem href="/credits" badge={`$${credits}`} key="Credits">
                Credits
            </MenuItem>
            <MenuItem href="/settings" key="Settings">
                Settings
            </MenuItem>
            <MenuItem key="Logout" onClick={onLogout}>
                Logout
            </MenuItem>
        </Menu>
    </Dropdown>
);
