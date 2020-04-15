import React, { FC, PropsWithChildren } from 'react';
import DocumentTitle from 'react-document-title';

import { Footer } from '../Footer';
import { HeaderContainer } from '../Header';

import styles from './Page.module.scss';

export interface IPageProps {
    title: string;
}

export const Page: FC<PropsWithChildren<IPageProps>> = ({
    title,
    children,
}) => (
    <DocumentTitle title={title}>
        <div className={styles.page}>
            <HeaderContainer />
            <main>
                {children}
            </main>
            <Footer className={styles.footer} />
        </div>
    </DocumentTitle>
);
