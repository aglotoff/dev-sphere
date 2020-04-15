/**
 * @file Friend Requests Notifier container component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { FriendsNotifier } from './FriendsNotifier';

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
    }, {
        userId: '2',
        userName: 'Rock Smith',
        profileUrl: '/',
    }, {
        userId: '3',
        userName: 'Joy Doe',
        profileUrl: '/',
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
