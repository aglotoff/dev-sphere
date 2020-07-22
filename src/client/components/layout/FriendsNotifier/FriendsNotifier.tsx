/**
 * @file Friend Requests Notifier component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import React, { FC, MouseEventHandler } from 'react';

// UI Imports
import { Button } from '../../common/Button';
import { Notifier, NotifierEntry } from '../Notifier';

// CSS Imports
import styles from './FriendsNotifier.module.scss';

/**
 * Props for the Friend Request Notification component.
 */
export interface IFriendsNotifierEntry {
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
export const FriendsNotification: FC<IFriendsNotifierEntry> = ({
    onAcceptClick,
    picture,
    profileUrl,
    userName,
}) => (
    <NotifierEntry
        linkText="View Profile"
        picture={picture}
        url={profileUrl}
    >
        <div className={styles.entry}>
            <div className={styles.userName}>
                {userName}
            </div>

            <Button
                size="sm"
                className={styles.acceptBtn}
                onClick={onAcceptClick}
            >
                Accept
            </Button>
        </div>
    </NotifierEntry>
);

/**
 * Props for the Friend Requests Notifier component.
 */
export interface IFriendsNotifierProps {
    /** The items to display inside the dropdown. */
    items: Array<IFriendsNotifierEntry & { userId: string; }>;
    /**
     * Handle the accept friend request action.
     *
     * @param userId The ID of the user whose friend request will be accepted.
     */
    onAccept: (userId: string) => void;
    /** Handle the clear all action. */
    onClearAll: () => void;
}

/**
 * Notifier for new friend requests.
 *
 * This component is displayed in the header along with two other notifiers.
 *
 * @param param The component props.
 * @returns The element to render.
 */
export const FriendsNotifier: FC<IFriendsNotifierProps> = ({
    onAccept,
    onClearAll,
    items,
}) => (
    <Notifier
        emptyText="You have no new friend requests"
        icon={faUserPlus}
        onClearAll={onClearAll}
        popupId="top-friends"
        settingsText="Find Friends"
        settingsUrl="/friends"
        title="Friend Requests"
        viewAllText="View All Friend Requests"
        viewAllUrl="/friends"
    >
        {items.map((notification) => (
            <FriendsNotification
                key={notification.userId}
                userName={notification.userName}
                profileUrl={notification.profileUrl}
                picture={notification.picture}
                onAcceptClick={(e) => {
                    // Prevent the dropdown from collapsing when clicking on
                    // the "accept" button.
                    e.stopPropagation();
                    onAccept(notification.userId);
                }}
            />
        ))}
    </Notifier>
);
