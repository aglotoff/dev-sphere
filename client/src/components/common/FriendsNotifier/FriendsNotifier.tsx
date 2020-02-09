/**
 * @file Friend Requests Notifier component.
 * @author Andrey Glotov
 */

// Imports
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';

// UI Imports
import {
    FriendsNotification,
    IFriendsNotificationProps,
} from '../FriendsNotification';
import { Notifier } from '../Notifier';

/**
 * Props for the Friend Requests Notifier component.
 */
export interface IFriendsNotifierProps {
    /** The items to display inside the dropdown. */
    items: Array<IFriendsNotificationProps & { userId: string; }>;
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
        settingsText="Find Friends"
        settingsUrl="/friends"
        title="Friend Requests"
        viewAllText="View All Friend Requests"
        viewAllUrl="/friends"
    >
        { items.map(({ userId, userName, profileUrl }) => (
            <FriendsNotification
                key={userId}
                userName={userName}
                profileUrl={profileUrl}
                onAcceptClick={(e) => {
                    // Prevent the dropdown from collapsing when clicking on
                    // the "accept" button.
                    e.stopPropagation();
                    onAccept(userId);
                }}
            />
        )) }
    </Notifier>
);
