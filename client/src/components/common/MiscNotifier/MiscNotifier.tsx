import { faBell } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';

import { INotificationProps, Notification } from '../Notification';
import { Notifier } from '../Notifier';

export interface IMiscNotifierProps {
    onClearAll?: () => void;
    items: Array<INotificationProps & { id: string }>;
}

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
            <Notification key={id} {...restProps} />
        )) }
    </Notifier>
);
