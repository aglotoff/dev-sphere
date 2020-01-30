/**
 * @file User dropdown menu.
 * @author Andrey Glotov
 */

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, { FC } from 'react';

import { Avatar } from '../Avatar';
import { Dropdown, IInjectedDropdownToggleProps } from '../Dropdown';
import { DropdownMenu } from '../DropdownMenu';

import styles from './UserMenu.module.scss';

/**
 * Props for the User menu component.
 */
export interface IUserMenuProps {
    /** Additional class name. */
    className?: string;
    /** First name of the user. */
    userName: string;
    /** Profile picture. */
    picture?: string;
    /** Number of credits. */
    credits: number;
    /** Handle clicking on the logout menu item. */
    onLogout: () => void;
}

/**
 * Presentational component for the user dropdown menu.
 */
export const UserMenu: FC<IUserMenuProps> = ({
    className,
    credits,
    onLogout,
    picture,
    userName,
}) => {
    const renderToggle = (props: IInjectedDropdownToggleProps) => {
        const toggleClass = classnames(
            styles.toggle,
            props.expanded && styles.toggle_expanded,
        );

        return (
            <span className={toggleClass}>
                <Avatar picture={picture} />
                <span className={styles.greeting}>
                    Hi! {userName}
                </span>
                <i className={styles.arrow} aria-hidden="true">
                    <FontAwesomeIcon icon={faAngleDown} />
                </i>
            </span>
        );
    };

    return (
        <Dropdown
            id="account-menu"
            className={className}
            renderToggle={renderToggle}
        >
            <DropdownMenu>
                <DropdownMenu.Item href="/profile">
                    Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item href="/messages">
                    Messages
                </DropdownMenu.Item>
                <DropdownMenu.Item href="/booked-events">
                    Booked Events
                </DropdownMenu.Item>
                <DropdownMenu.Item href="/credits" label={`$${credits}`}>
                    Credits
                </DropdownMenu.Item>
                <DropdownMenu.Item href="/settings">
                    Settings
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={onLogout}>
                    Logout
                </DropdownMenu.Item >
            </DropdownMenu>
        </Dropdown>
    );
};
