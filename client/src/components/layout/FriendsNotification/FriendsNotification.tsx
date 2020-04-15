/**
 * @file Friend Request Notification component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC, MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';

// UI Imports
import { Button } from '../../common/Button';
import { Thumbnail } from '../../common/Thumbnail';

// CSS Imports
import styles from './FriendsNotification.module.scss';

/**
 * Props for the Friend Request Notification component.
 */
export interface IFriendsNotificationProps {
    /** Handle clicking on the "Accept" button. */
    onAcceptClick?: MouseEventHandler;
    /** User profile picture. */
    picture?: string;
    /** URL of the user profile. */
    profileUrl: string;
    /** User name. */
    userName: string;
}

/**
 * Notification to display inside the Friend Requests Notifier.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const FriendsNotification: FC<IFriendsNotificationProps> = ({
    onAcceptClick,
    picture,
    profileUrl,
    userName,
}) => (
    <div className={styles.container}>
        <Thumbnail src={picture} size="sm" />

        <div className={styles.name}>
            {userName}
        </div>

        <NavLink
            to={profileUrl}
            className={styles.profileLink}
        >
            View profile
        </NavLink>

        <Button
            size="sm"
            className={styles.btn}
            onClick={onAcceptClick}
        >
            Accept
        </Button>
    </div>
);
