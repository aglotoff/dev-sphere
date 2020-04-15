/**
 * @file Inbox Messages Notifier component.
 * @author Andrey Glotov
 */

// Imports
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';

// UI Imports
import {
    IInboxNotificationProps,
    InboxNotification,
} from '../InboxNotification';
import { Notifier } from '../Notifier';

/**
 * Props for the Inbox Messages Notifier component.
 */
export interface IInboxNotifierProps {
    /** The items to display inside the dropdown. */
    items: Array<IInboxNotificationProps & { userId: string; }>;
    /** Handle the clear all action. */
    onClearAll: () => void;
}

/**
 * Notifier for new inbox messages.
 *
 * This component is displayed in the header along with two other notifiers.
 *
 * @param param The component props.
 * @returns The element to render.
 */
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
