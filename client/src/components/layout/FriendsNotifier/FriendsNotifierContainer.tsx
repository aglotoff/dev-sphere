/**
 * @file Friend Requests Notifier container component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { FriendsNotifier } from './FriendsNotifier';

// Photo Imports
import pic2 from '../../../assets/images/avatars/MjEzMDIuanBn.jpg';
import pic1 from '../../../assets/images/avatars/XzA1NjkxNzQuanBn.jpg';
import pic3 from '../../../assets/images/avatars/XzA2NzExMjQuanBn.jpg';

/**
 * Container component for the Friend Requests Notifier.
 *
 * @returns The element to render.
 */
export const FriendsNotifierContainer: FC = () => {
    // TODO: replace with data from the store.
    const items = [{
        userId: '1',
        userName: 'Jessica William',
        profileUrl: '/',
        picture: pic1,
    }, {
        userId: '2',
        userName: 'Rock Smith',
        profileUrl: '/',
        picture: pic2,
    }, {
        userId: '3',
        userName: 'Jane Doe',
        profileUrl: '/',
        picture: pic3,
    }];

    const handleAccept = () => null;
    const handleClearAll = () => null;

    return (
        <FriendsNotifier
            items={items}
            onAccept={handleAccept}
            onClearAll={handleClearAll}
        />
    );
};
