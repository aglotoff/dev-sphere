import React, { FC } from 'react';

import { MiscNotifier } from '../MiscNotifier';

export const MiscNotifierContainer: FC = () => {
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

    return (
        <MiscNotifier items={items} />
    );
};
