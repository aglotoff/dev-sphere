/**
 * @file Miscellaneous Events Notifier component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { faBell } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';

// UI Imports
import { TimeAgo } from '../../common/TimeAgo';
import { Notifier, NotifierEntry } from '../Notifier';

// CSS Imports
import styles from './MiscNotifier.module.scss';

/**
 * Props for the Miscellaneous Event Notifier Entry component.
 */
export interface IMiscNotifierEntryProps {
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
export const MiscNotifierEntry: FC<IMiscNotifierEntryProps> = ({
    picture,
    title,
    description,
    time,
    url,
}) => (
    <NotifierEntry linkText="Read more" picture={picture} url={url}>
        <div className={styles.entry}>
            <span className={styles.entryTitle}>
                {title}
            </span>
            {' '}
            <span className={styles.entryDesc}>
                {description}
            </span>

            <TimeAgo datetime={time} className={styles.time} />
        </div>
    </NotifierEntry>
);

/**
 * Props for the Miscellaneous Events Notifier component.
 */
export interface IMiscNotifierProps {
    /** The items to display inside the dropdown. */
    items: Array<IMiscNotifierEntryProps & { id: string }>;
    /** Handle the clear all action. */
    onClearAll: () => void;
}

/**
 * Notifier for all events other than friend requests and inbox messages.
 *
 * This component is displayed in the header along with two other notifiers.
 *
 * @param param The component props.
 * @returns The element to render.
 */
export const MiscNotifier: FC<IMiscNotifierProps> = ({
    items,
    onClearAll,
}) => (
    <Notifier
        icon={faBell}
        onClearAll={onClearAll}
        popupId="top-notifications"
        settingsUrl="/notifications"
        title="Notifications"
        viewAllUrl="/notifications"
    >
        { items.map(({ id, ...restProps }) => (
            <MiscNotifierEntry key={id} {...restProps} />
        )) }
    </Notifier>
);
