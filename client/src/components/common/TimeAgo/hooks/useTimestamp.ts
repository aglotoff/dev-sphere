/**
 * @file useTimestamp hook.
 * @author Andrey Glotov
 */

// Imports
import moment from 'moment';
import { useEffect, useState } from 'react';

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
        return `${diffHours}h ago`;
    }

    const diffDays = now.diff(m, 'days');
    if (diffDays < 7) {
        return `${diffDays}d ago`;
    }

    const diffWeeks = now.diff(m, 'weeks');
    if (diffWeeks < 5) {
        return `${diffWeeks}w ago`;
    }

    const diffMonths = now.diff(m, 'months');
    if (diffMonths < 12) {
        return `${diffMonths}m ago`;
    }

    const diffYears = now.diff(m, 'years');
    return `${diffYears}y ago`;
}

/**
 * Return a live updating timestamp in "time ago" format.
 *
 * @param datetime The datetime value to display.
 * @param updateInterval If not zero, delay between updates, in ms. Default is
 *  60000 (one minute).
 * @returns The current timestamp in "time ago" format.
 */
export function useTimestamp(datetime: Date, updateInterval = 60000) {
    const [ displayValue, setDisplayValue ] = useState(timeToString(datetime));

    useEffect(() => {
        if (updateInterval !== 0) {
            const intervalID = setInterval(() => {
                setDisplayValue(timeToString(datetime));
            }, updateInterval);

            return () => {
                clearInterval(intervalID);
            };
        }
    }, [ datetime, setDisplayValue, updateInterval ]);

    return displayValue;
}
