import React, { FC } from 'react';

import { InboxNotifier } from '../InboxNotifier';

export const InboxNotifierContainer: FC = () => {
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

    return (
        <InboxNotifier items={items} />
    );
};
