import { faBell } from '@fortawesome/free-solid-svg-icons';
import React, { FC, PropsWithChildren } from 'react';

import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';
import NotificationPopup from '../NotificationPopup/NotificationPopup';

export interface IHeaderNotificationsProps {
    onClearAll?: () => void;
}

const HeaderNotifications: FC<PropsWithChildren<IHeaderNotificationsProps>> = ({
    onClearAll,
}) => (
    <NotificationDropdown
        icon={faBell}
        title="Notifications"
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
                View All Notifications
            </NotificationPopup.ViewAll>
        </NotificationPopup>
    </NotificationDropdown>
);

export default HeaderNotifications;
