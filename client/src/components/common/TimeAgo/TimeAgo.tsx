import classNames from 'classnames';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';

import styles from './TimeAgo.module.scss';

export function timeToString(time: Date) {
    const m = moment(time);
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

export interface ITimeAgoProps {
    datetime: Date;
    className?: string;
}

export const TimeAgo: FC<ITimeAgoProps> = ({
    datetime,
    className,
}) => {
    const [ timeString, setTimeString ] = useState(timeToString(datetime));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeString(timeToString(datetime));
        }, 10000);

        return () => {
            clearInterval(interval);
        }
    }, [ datetime, setTimeString ]);

    return (
        <time
            dateTime={datetime.toISOString()}
            className={classNames(styles.timeAgo, className)}
        >
            {timeString}
        </time>
    );
};
