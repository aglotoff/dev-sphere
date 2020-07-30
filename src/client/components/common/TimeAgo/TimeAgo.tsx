/**
 * @file Time Ago component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import classNames from 'classnames';
import React, { FC } from 'react';

// CSS Imports
import styles from './TimeAgo.module.scss';

// Hook Imports
import { useTimestamp } from './hooks';

/**
 * Props for the Time Ago component.
 */
export interface TimeAgoProps {
    /** Additional class name. */
    className?: string;
    /** The datetime to display. */
    datetime: Date;
    /** Delay between updating the displayed value, in ms. */
    updateInterval?: number;
}

/**
 * Live updating timestamp in "time ago" format.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const TimeAgo: FC<TimeAgoProps> = ({
    datetime,
    className,
    updateInterval,
}) => {
    const timestamp = useTimestamp(datetime, updateInterval);

    return (
        <time
            dateTime={datetime.toISOString()}
            className={classNames(styles.timeAgo, className)}
        >
            {timestamp}
        </time>
    );
};
