/**
 * @file Page component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

// UI Imports
import { Footer } from '../Footer';
import { HeaderContainer } from '../Header';

// Hook Imports
import { useScrollRestore } from '../../../hooks';

// CSS Imports
import styles from './Page.module.scss';

/**
 * Props for the Page component.
 */
export interface PageProps {
    /** Document title. */
    title?: string;
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
export const Page: FC<PageProps> = ({
    title,
    children,
}) => {
    useScrollRestore();

    return (
        <div className={styles.page}>
            <Helmet>
                {title && <title>{title}</title>}
            </Helmet>

            <HeaderContainer />

            <main className={styles.main} id="content">
                {children}
            </main>

            <Footer className={styles.footer} />
        </div>
    );
};
