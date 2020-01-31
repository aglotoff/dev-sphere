import React, { FC, PropsWithChildren } from 'react';
import DocumentTitle from 'react-document-title';

import { Footer } from '../../common/Footer';
import { Header } from '../../common/Header';

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
            <Header />
            <main>
                {children}
            </main>
            <Footer className={styles.footer} />
        </div>
    </DocumentTitle>
);
