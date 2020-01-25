import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React, { FC, PropsWithChildren } from 'react';

import { NotificationDropdown } from '../NotificationDropdown';
import { NotificationPopup } from '../NotificationPopup';

export interface IHeaderMessagesProps {
    onClearAll?: () => void;
}

export const HeaderMessages: FC<PropsWithChildren<IHeaderMessagesProps>> = ({
    onClearAll,
}) => (
    <NotificationDropdown
        icon={faEnvelope}
        title="Messages"
        showIndicator={true}
    >
        <NotificationPopup>
            <NotificationPopup.Header>
                <NotificationPopup.Action href="/">
                    Settings
                </NotificationPopup.Action>
                <NotificationPopup.Action onClick={onClearAll}>
                    Clear all
                </NotificationPopup.Action>
            </NotificationPopup.Header>

            <NotificationPopup.ViewAll href="/">
                View All Messages
            </NotificationPopup.ViewAll>
        </NotificationPopup>
    </NotificationDropdown>
);
