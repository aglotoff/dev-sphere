import React, { FC } from 'react';
import DocumentTitle from 'react-document-title';

import { Header } from '../../common/Header';

export const Home: FC = () => (
    <DocumentTitle title="DevSphere - Social Network for Developers">
        <Header />
    </DocumentTitle>
);
