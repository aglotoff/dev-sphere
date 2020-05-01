/**
 * @file Inbox Messages Notifier component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';

// UI Imports
import { TimeAgo } from '../../common/TimeAgo';
import { Notifier, NotifierEntry } from '../Notifier';

// CSS Imports
import styles from './InboxNotifier.module.scss';

/**
 * Props for the Inbox Message Notifier Entry component.
 */
export interface IInboxNotifierEntryProps {
    /** URL of the corresponding chat. */
    chatUrl: string;
    /** Message text. */
    message: string;
    /** Message date and time. */
    time: Date;
    /** Profile picture of the sender. */
    userAvatar?: string;
    /** User name of the sender. */
    userName: string;
}

/**
 * NotifierEntry to display inside the Inbox Messages Notifier.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const InboxNotifierEntry: FC<IInboxNotifierEntryProps> = ({
    userName,
    userAvatar,
    message,
    time,
    chatUrl,
}) => (
    <NotifierEntry
        linkText="Go to conversation"
        picture={userAvatar}
        url={chatUrl}
    >
        <div className={styles.entry}>
            <div className={styles.userName}>{userName}</div>

            <div className={styles.entryContent}>
                <div className={styles.message}>{message}</div>
                <TimeAgo datetime={time} className={styles.time} />
            </div>
        </div>
    </NotifierEntry>
);

/**
 * Props for the Inbox Messages Notifier component.
 */
export interface IInboxNotifierProps {
    /** The items to display inside the dropdown. */
    items: Array<IInboxNotifierEntryProps & { userId: string; }>;
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
        popupId="top-inbox"
        settingsUrl="/inbox"
        title="Inbox"
        viewAllText="View All Messages"
        viewAllUrl="/inbox"
    >
        { items.map(({ userId, ...restProps }) => (
            <InboxNotifierEntry
                key={userId}
                {...restProps}
            />
        )) }
    </Notifier>
);
