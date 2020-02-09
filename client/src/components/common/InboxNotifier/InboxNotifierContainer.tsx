/**
 * @file Inbox Messages Notifier container component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { InboxNotifier } from './InboxNotifier';

/**
 * Container component for the Inbox Messages Notifier.
 *
 * @returns The element to render.
 */
export const InboxNotifierContainer: FC = () => {
    // TODO: replace with data from the store.
    const items = [{
        userId: '1',
        userName: 'Jessica William',
        chatUrl: '/',
        message: 'Hey How are you doing bro?',
        time: new Date(Date.now() - 120000),
    }, {
        userId: '2',
        userName: 'Rock Smith',
        chatUrl: '/',
        message: 'Interesting event but I will not attend)',
        time: new Date(Date.now() - 300000),
    }, {
        userId: '3',
        userName: 'Joy Doe',
        chatUrl: '/',
        message: 'Hey sir! Whats going on??',
        time: new Date(Date.now() - 600000),
    }];

    const handleClearAll = () => null;

    return (
        <InboxNotifier
            items={items}
            onClearAll={handleClearAll}
        />
    );
};
