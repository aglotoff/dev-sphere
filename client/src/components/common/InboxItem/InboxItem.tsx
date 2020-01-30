import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Avatar } from '../Avatar';
import { TimeAgo } from '../TimeAgo';

import styles from './InboxItem.module.scss';

export interface IInboxItemProps {
    userName: string;
    userAvatar?: string;
    message: string;
    time: Date;
    chatUrl: string;
}

export const InboxItem: FC<IInboxItemProps> = ({
    userName,
    userAvatar,
    message,
    time,
    chatUrl,
}) => (
    <div className={styles.container}>
        <Avatar size="sm" picture={userAvatar} />

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
