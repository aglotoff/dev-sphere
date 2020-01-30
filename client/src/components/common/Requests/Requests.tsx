import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import React, { FC, PropsWithChildren } from 'react';

import { DropdownPanel } from '../DropdownPanel';
import { FriendRequest, IFriendRequest } from '../FriendRequest';
import { HeaderDropdown } from '../HeaderDropdown';

export interface IRequestsProps {
    onClearAll?: () => void;
    items: Array<IFriendRequest & { userId: string; }>;
}

export const Requests: FC<PropsWithChildren<IRequestsProps>> = ({
    onClearAll,
    items,
}) => {
    let clearAllAction = null;
    let content;
    if (items.length > 0) {
        clearAllAction = (
            <DropdownPanel.Action onClick={onClearAll}>
                Clear all
            </DropdownPanel.Action>
        );

        content = (
            <>
                { items.map(({ userId, userName, profileUrl }) => (
                    <FriendRequest
                        key={userId}
                        userName={userName}
                        profileUrl={profileUrl}
                        onAcceptClick={(e) => {
                            // Prevent the popup from being collapsed.
                            e.stopPropagation();
                        }}
                    />
                )) }

                <DropdownPanel.ViewAll href="/">
                    View All Friend Requests
                </DropdownPanel.ViewAll>
            </>
        );
    } else {
        content = (
            <DropdownPanel.Placeholder>
                You have no friend requests
            </DropdownPanel.Placeholder>
        );
    }

    return (
        <HeaderDropdown
            icon={faUserPlus}
            title="Friend Requests"
            showIndicator={items.length > 0}
        >
            <DropdownPanel>
                <DropdownPanel.Header>
                    <DropdownPanel.Action href="/">
                        Find Friends
                    </DropdownPanel.Action>

                    {clearAllAction}
                </DropdownPanel.Header>

                {content}
            </DropdownPanel>
        </HeaderDropdown>
    );
};
