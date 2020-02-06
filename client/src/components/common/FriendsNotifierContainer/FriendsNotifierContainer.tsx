import React, { FC } from 'react';

import { FriendsNotifier } from '../FriendsNotifier';

export const FriendsNotifierContainer: FC = () => {
    const items = [{
        userId: '1',
        userName: 'Jessica William',
        profileUrl: '/',
    }, {
        userId: '2',
        userName: 'Rock Smith',
        profileUrl: '/',
    }, {
        userId: '3',
        userName: 'Joy Doe',
        profileUrl: '/',
    }];

    return (
        <FriendsNotifier items={items} />
    );
};
