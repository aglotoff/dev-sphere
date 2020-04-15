/**
 * @file Inbox Message Notification component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

// UI Imports
import { Thumbnail } from '../../common/Thumbnail';
import { TimeAgo } from '../../common/TimeAgo';

// CSS Imports
import styles from './InboxNotification.module.scss';

/**
 * Props for the Inbox Message Notification component.
 */
export interface IInboxNotificationProps {
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
 * Notification to display inside the Inbox Messages Notifier.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const InboxNotification: FC<IInboxNotificationProps> = ({
    userName,
    userAvatar,
    message,
    time,
    chatUrl,
}) => (
    <div className={styles.container}>
        <Thumbnail size="sm" src={userAvatar} />

        <div className={styles.body}>
            <div className={styles.name}>{userName}</div>

            <div className={styles.bodyContent}>
                <div className={styles.message}>{message}</div>
                <TimeAgo datetime={time} className={styles.time} />
            </div>
        </div>

        <NavLink to={chatUrl} className={styles.conversationLink}>
            Go to conversation
        </NavLink>
    </div>
);
