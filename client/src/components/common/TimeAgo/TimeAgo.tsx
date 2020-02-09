/**
 * @file Time Ago component.
 * @author Andrey Glotov
 */

// Imports
import classNames from 'classnames';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';

// CSS Imports
import styles from './TimeAgo.module.scss';

/**
 * Convert datetime value to a "time ago" string.
 *
 * @param datetime The datetime to convert.
 * @return The corresponding string in "time ago" format.
 */
export function timeToString(datetime: Date) {
    const m = moment(datetime);
    const now = moment(Date.now());

    const diffSeconds = now.diff(m, 'seconds');
    if (diffSeconds < 60) {
        return 'Just now';
    }

    const diffMinutes = now.diff(m, 'minutes');
    if (diffMinutes < 60) {
        return `${diffMinutes} min ago`;
    }

    const diffHours = now.diff(m, 'hours');
    if (diffHours < 24) {
        return `${diffMinutes}h ago`;
    }

    const diffDays = now.diff(m, 'days');
    if (diffDays < 7) {
        return `${diffMinutes}d ago`;
    }

    const diffWeeks = now.diff(m, 'weeks');
    if (diffWeeks < 5) {
        return `${diffMinutes}w ago`;
    }

    const diffMonths = now.diff(m, 'months');
    if (diffMonths < 12) {
        return `${diffMinutes}m ago`;
    }

    const diffYears = now.diff(m, 'years');
    return `${diffYears}y ago`;
}

/**
 * Props for the Time Ago component.
 */
export interface ITimeAgoProps {
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
export const TimeAgo: FC<ITimeAgoProps> = ({
    datetime,
    className,
    updateInterval = 10000,
}) => {
    const [ displayValue, setDisplayValue ] = useState(timeToString(datetime));

    useEffect(() => {
        const intervalID = setInterval(() => {
            setDisplayValue(timeToString(datetime));
        }, updateInterval);

        return () => {
            clearInterval(intervalID);
        };
    }, [ datetime, setDisplayValue, updateInterval ]);

    return (
        <time
            dateTime={datetime.toISOString()}
            className={classNames(styles.timeAgo, className)}
        >
            {displayValue}
        </time>
    );
};
