import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';

import {
    IInboxNotificationProps,
    InboxNotification,
} from '../InboxNotification';
import { Notifier } from '../Notifier';

export interface IInboxNotifierProps {
    onClearAll?: () => void;
    items: Array<IInboxNotificationProps & { userId: string; }>;
}

export const InboxNotifier: FC<IInboxNotifierProps> = ({
    items,
    onClearAll,
}) => (
    <Notifier
        emptyText="You have no new messages"
        icon={faEnvelope}
        onClearAll={onClearAll}
        settingsUrl="/inbox"
        title="Inbox"
        viewAllText="View All Messages"
        viewAllUrl="/inbox"
    >
        { items.map(({ userId, ...restProps }) => (
            <InboxNotification
                key={userId}
                {...restProps}
            />
        )) }
    </Notifier>
);
