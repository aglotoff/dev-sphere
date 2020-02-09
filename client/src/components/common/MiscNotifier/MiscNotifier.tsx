/**
 * @file Miscellaneous Events Notifier component.
 * @author Andrey Glotov
 */

// Imports
import { faBell } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';

// UI Imports
import { IMiscNotificationProps, MiscNotification } from '../MiscNotification';
import { Notifier } from '../Notifier';

/**
 * Props for the Miscellaneous Events Notifier component.
 */
export interface IMiscNotifierProps {
    /** The items to display inside the dropdown. */
    items: Array<IMiscNotificationProps & { id: string }>;
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
        settingsUrl="/notifications"
        title="Notifications"
        viewAllUrl="/notifications"
    >
        { items.map(({ id, ...restProps }) => (
            <MiscNotification key={id} {...restProps} />
        )) }
    </Notifier>
);
