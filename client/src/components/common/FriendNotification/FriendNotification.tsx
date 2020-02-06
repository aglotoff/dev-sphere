import React, { FC, MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';

import { Avatar } from '../Avatar';
import { Button } from '../Button';

import styles from './FriendNotification.module.scss';

export interface IFriendNotificationProps {
    picture?: string;
    userName: string;
    profileUrl: string;
    onAcceptClick?: MouseEventHandler;
}

export const FriendNotification: FC<IFriendNotificationProps> = ({
    picture,
    userName,
    profileUrl,
    onAcceptClick,
}) => (
    <div className={styles.container}>
        <Avatar picture={picture} size="sm" />

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
