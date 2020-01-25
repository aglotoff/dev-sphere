import React, { FC } from 'react';

import { Button } from '../Button';
import { ProfileImage } from '../ProfileImage';

import styles from './FriendRequest.module.scss';

export interface IFriendRequest {
    picture?: string;
    name: string;
    profileUrl: string;
}

export const FriendRequest: FC<IFriendRequest> = ({
    picture,
    name,
    profileUrl,
}) => (
    <div className={styles.container}>
        <a href={profileUrl} tabIndex={-1}>
            <ProfileImage picture={picture} size="sm" />
        </a>

        <a href={profileUrl} className={styles.name}>
            {name}
        </a>

        <Button size="sm" className={styles.btn}>Accept</Button>
    </div>
);
