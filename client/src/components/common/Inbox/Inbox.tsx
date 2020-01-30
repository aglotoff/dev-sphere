import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React, { FC, PropsWithChildren } from 'react';

import { DropdownPanel } from '../DropdownPanel';
import { HeaderDropdown } from '../HeaderDropdown';
import { IInboxItemProps, InboxItem} from '../InboxItem';

export interface IInboxProps {
    onClearAll?: () => void;
    items: Array<IInboxItemProps & { userId: string; }>;
}

export const Inbox: FC<PropsWithChildren<IInboxProps>> = ({
    items,
    onClearAll,
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
                { items.map(({ userId, ...restProps }) => (
                    <InboxItem
                        key={userId}
                        {...restProps}
                    />
                )) }

                <DropdownPanel.ViewAll href="/">
                    View All Messages
                </DropdownPanel.ViewAll>
            </>
        );
    } else {
        content = (
            <DropdownPanel.Placeholder>
                You have no unread messages
            </DropdownPanel.Placeholder>
        );
    }

    return (
        <HeaderDropdown
            icon={faEnvelope}
            title="Messages"
            showIndicator={items.length > 0}
        >
            <DropdownPanel>
                <DropdownPanel.Header>
                    <DropdownPanel.Action href="/">
                        Settings
                    </DropdownPanel.Action>

                    {clearAllAction}
                </DropdownPanel.Header>

                {content}
            </DropdownPanel>
        </HeaderDropdown>
    );
};
