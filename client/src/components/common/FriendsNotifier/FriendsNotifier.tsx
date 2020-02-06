import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';

import {
    FriendNotification,
    IFriendNotificationProps,
} from '../FriendNotification';
import { Notifier } from '../Notifier';

export interface IFriendsNotifierProps {
    onClearAll?: () => void;
    items: Array<IFriendNotificationProps & { userId: string; }>;
}

export const FriendsNotifier: FC<IFriendsNotifierProps> = ({
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
            <FriendNotification
                key={userId}
                userName={userName}
                profileUrl={profileUrl}
                onAcceptClick={(e) => {
                    // Prevent the dropdown from collapsing.
                    e.stopPropagation();
                }}
            />
        )) }
    </Notifier>
);
