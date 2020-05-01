/**
 * @file Page component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC, PropsWithChildren } from 'react';
import DocumentTitle from 'react-document-title';

// UI Imports
import { Footer } from '../Footer';
import { HeaderContainer } from '../Header';

// CSS Imports
import styles from './Page.module.scss';

/**
 * Props for the Page component.
 */
export interface IPageProps {
    /** Document title. */
    title: string;
}

/**
 * Page wrapper component.
 *
 * This component is used to wrap around all application pages except login
 * and register (they have a different wrapper component <AuthPage />).
 *
 * @param param The component props.
 * @returns The element to render.
 */
export const Page: FC<PropsWithChildren<IPageProps>> = ({
    title,
    children,
}) => (
    <DocumentTitle title={title}>
        <div className={styles.page}>
            <HeaderContainer />

            <main className={styles.main} id="content">
                {children}
            </main>

            <Footer className={styles.footer} />
        </div>
    </DocumentTitle>
);
