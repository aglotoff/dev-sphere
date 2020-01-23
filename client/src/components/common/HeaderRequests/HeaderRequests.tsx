import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import React, { FC, PropsWithChildren } from 'react';

import FriendRequest from '../FriendRequest/FriendRequest';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';
import NotificationPopup from '../NotificationPopup/NotificationPopup';

export interface IHeaderRequestsProps {
    onClearAll?: () => void;
}

const HeaderRequests: FC<PropsWithChildren<IHeaderRequestsProps>> = ({
    onClearAll,
}) => (
    <NotificationDropdown
        icon={faUserPlus}
        title="Friend Requests"
        showIndicator={true}
    >
        <NotificationPopup>
            <NotificationPopup.Header>
                <NotificationPopup.Action href="/">
                    Find Friends
                </NotificationPopup.Action>
                <NotificationPopup.Action onClick={onClearAll}>
                    Clear all
                </NotificationPopup.Action>
            </NotificationPopup.Header>

            <FriendRequest name="Adriana Lima" profileUrl="/" />
            <FriendRequest name="Kim Kardashian" profileUrl="/" />
            <FriendRequest name="Selena Gomez" profileUrl="/" />

            <NotificationPopup.ViewAll href="/">
                View All Friend Requests
            </NotificationPopup.ViewAll>
        </NotificationPopup>
    </NotificationDropdown>
);

export default HeaderRequests;
