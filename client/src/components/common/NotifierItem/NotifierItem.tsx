import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Avatar } from '../Avatar';
import { TimeAgo } from '../TimeAgo';

import styles from './NotifierItem.module.scss';

export interface INotifierItemProps {
    picture?: string;
    title: string;
    description: string;
    time: Date;
    url: string;
}

export const NotifierItem: FC<INotifierItemProps> = ({
    picture,
    title,
    description,
    time,
    url,
}) => (
    <div className={styles.container}>
        <Avatar picture={picture} />

        <div className={styles.body}>
            <div className={styles.title}>{title}</div>
            {' '}
            <div className={styles.description}>{description}</div>
            <TimeAgo datetime={time} className={styles.time} />
        </div>

        <NavLink to={url} className={styles.link}>Read more</NavLink>
    </div>
);
