/**
 * @file Notifier Entry component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

// UI Imports
import { Thumbnail } from '../../common/Thumbnail';

// CSS Imports
import styles from './Notifier.module.scss';

/**
 * Props for the Friend Request Notification component.
 */
export interface NotifierEntryProps {
    /** Text content of the anchor tag (for accessibility purposes). */
    linkText: string;
    /** Thumbnail picture. */
    picture?: string;
    /** URL to open when clicking on the entry. */
    url: string;
}

/**
 * Notifier Entry to display inside the Notifier component.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const NotifierEntry: FC<NotifierEntryProps> = ({
    children,
    linkText,
    picture,
    url,
}) => (
    <div className={styles.entry}>
        <Thumbnail src={picture} size="sm" />

        <div className={styles.entryInner}>
            {children}
        </div>

        <NavLink className={styles.entryLink} to={url}>
            {linkText}
        </NavLink>
    </div>
);
