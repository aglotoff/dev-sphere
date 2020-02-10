/**
 * @file Miscellaneous Event Notification component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

// UI Imports
import { Thumbnail } from '../Thumbnail';
import { TimeAgo } from '../TimeAgo';

// CSS Imports
import styles from './MiscNotification.module.scss';

/**
 * Props for the Miscellaneous Event Notification component.
 */
export interface IMiscNotificationProps {
    /** Related picture or profile avatar.  */
    picture?: string;
    /** Notification title. */
    title: string;
    /** Description text. */
    description: string;
    /** Notification time. */
    time: Date;
    /** URL to  */
    url: string;
}

/**
 * Notification to display inside the Miscellaneous Events Notifier.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const MiscNotification: FC<IMiscNotificationProps> = ({
    picture,
    title,
    description,
    time,
    url,
}) => (
    <div className={styles.container}>
        <Thumbnail src={picture} />

        <div className={styles.body}>
            <span className={styles.title}>
                {title}
            </span>
            {' '}
            <span className={styles.description}>
                {description}
            </span>

            <TimeAgo datetime={time} className={styles.time} />
        </div>

        <NavLink to={url} className={styles.link}>
            Read more
        </NavLink>
    </div>
);
