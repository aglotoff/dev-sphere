/**
 * @file Inbox Messages Notifier container component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { InboxNotifier } from './InboxNotifier';

// Photo Imports
import pic2 from '../../../assets/images/avatars/MjEzMDIuanBn.jpg';
import pic1 from '../../../assets/images/avatars/XzA1NjkxNzQuanBn.jpg';
import pic3 from '../../../assets/images/avatars/XzA2NzExMjQuanBn.jpg';

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
        time: new Date(Date.now() - 120),
        userAvatar: pic1,
    }, {
        userId: '2',
        userName: 'Rock Smith',
        chatUrl: '/',
        message: 'Interesting event but I will not attend)',
        time: new Date(Date.now() - 300),
        userAvatar: pic2,
    }, {
        userId: '3',
        userName: 'Joy Doe',
        chatUrl: '/',
        message: 'Hey sir! Whats going on??',
        time: new Date(Date.now() - 600),
        userAvatar: pic3,
    }];

    const handleClearAll = () => null;

    return (
        <InboxNotifier
            items={items}
            onClearAll={handleClearAll}
        />
    );
};
