/**
 * @file useTimestamp hook.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { useEffect, useState } from 'react';

/**
 * Convert datetime value to a "time ago" string.
 *
 * @param datetime The datetime to convert.
 * @return The corresponding string in "time ago" format.
 */
export function timeToString(datetime: Date) {
    const diffSeconds = Date.now() - datetime.getTime();
    if (diffSeconds < 60) {
        return 'Just now';
    }

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
        return `${diffMinutes} min ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
        return `${diffHours}h ago`;
    }

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) {
        return `${diffDays}d ago`;
    }

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 5) {
        return `${diffWeeks}w ago`;
    }

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) {
        return `${diffMonths}m ago`;
    }

    const diffYears = Math.floor(diffDays / 365);
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
