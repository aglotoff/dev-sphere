import { faBell } from '@fortawesome/free-solid-svg-icons';
import React, { FC, PropsWithChildren } from 'react';

import { DropdownPanel } from '../DropdownPanel';
import { HeaderDropdown } from '../HeaderDropdown';
import { INotifierItemProps, NotifierItem } from '../NotifierItem';

export interface INotifierProps {
    onClearAll?: () => void;
    items: Array<INotifierItemProps & { id: string }>;
}

export const Notifier: FC<PropsWithChildren<INotifierProps>> = ({
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
                { items.map(({ id, ...restProps }) => (
                    <NotifierItem key={id} {...restProps} />
                )) }

                <DropdownPanel.ViewAll href="/">
                    View All Notifications
                </DropdownPanel.ViewAll>
            </>
        );
    } else {
        content = (
            <DropdownPanel.Placeholder>
                You have no new notifications
            </DropdownPanel.Placeholder>
        );
    }

    return (
        <HeaderDropdown
            icon={faBell}
            title="Notifications"
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
