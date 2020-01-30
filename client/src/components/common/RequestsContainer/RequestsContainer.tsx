import React, { FC } from 'react';

import { Requests } from '../Requests';

export const RequestsContainer: FC = () => {
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
        <Requests items={items} />
    );
};
