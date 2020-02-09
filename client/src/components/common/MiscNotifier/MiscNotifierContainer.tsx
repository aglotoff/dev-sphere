/**
 * @file Miscellaneous Events Notifier container component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { MiscNotifier } from './MiscNotifier';

/**
 * Container component for the Miscellaneous Events Notifier.
 *
 * @returns The element to render.
 */
export const MiscNotifierContainer: FC = () => {
    // TODO: replace with data from the store.
    const items = [{
        id: '1',
        title: 'Jassica William',
        description: 'comment on your video',
        url: '/',
        time: new Date(Date.now() - 720000),
    }, {
        id: '2',
        title: 'Congratulations!',
        description: 'your order is accepted',
        url: '/',
        time: new Date(Date.now() - 300000),
    }, {
        id: '3',
        title: 'Tickets!',
        description: 'your bill slip sent on your email',
        url: '/',
        time: new Date(Date.now() - 1500000),
    }];

    const handleClearAll = () => null;

    return (
        <MiscNotifier
            items={items}
            onClearAll={handleClearAll}
        />
    );
};
