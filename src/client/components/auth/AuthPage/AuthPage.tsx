/**
 * @file The Authentication Page component
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import DocumentTitle from 'react-document-title';

// UI Imports
import { Logo } from '../../common/Logo';
import { Footer } from '../../layout/Footer';

// Hook Imports
import { useScrollRestore } from '../../../hooks';

// CSS Imports
import styles from './AuthPage.module.scss';

// Asset Imports
import loginImage from '../../../assets/images/login.svg';

/**
 * Props for the authentication page component
 */
export interface IAuthPageProps {
    /** Heading to display in the page header (not the document title). */
    heading: string;
    /** Document title. */
    title: string;
}

/**
 * The authentication page component.
 *
 * This component represents a common layout for the login and register pages.
 *
 * @param props The component props
 */
export const AuthPage: FC<IAuthPageProps> = ({
    children,
    heading,
    title,
}) => {
    useScrollRestore();

    return (
        <DocumentTitle title={title}>
            <div className={styles.page} id="content">
                <div className={styles.container}>
                    <div className={styles.inner}>
                        <header className={styles.header}>
                            <Logo showTitle />

                            <h1 className={styles.title}>{heading}</h1>

                            <p className={styles.text}>
                                This is a toy application, so feel free to use
                                a fake name and non-existent email for
                                registration!
                            </p>

                            <img
                                alt=""
                                className={styles.image}
                                src={loginImage}
                            />
                        </header>

                        <main className={styles.form}>
                            {children}
                        </main>
                    </div>
                </div>

                <Footer className={styles.footer} transparent />
            </div>
        </DocumentTitle>
    );
};
