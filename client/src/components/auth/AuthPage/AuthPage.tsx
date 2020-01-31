/**
 * @file The authentication page component
 * @author Andrey Glotov
 */

import React, { FC, ReactElement } from 'react';

import { AuthHeader } from '../../auth/AuthHeader';
import { Footer } from '../../common/Footer';

import styles from './AuthPage.module.scss';

/**
 * Props injected to the child form component.
 */
export interface IInjectedAuthPageProps {
    /** Additional class name for the form */
    className?: string;
}

/**
 * Props for the authentication page component
 */
export interface IAuthPageProps {
    /** Page title */
    title: string;

    /** Lead paragraph */
    text: string;

    /**
     * Render the child form component.
     *
     * @param injectedProps Props injected by the page component.
     */
    renderForm: (injectedProps: IInjectedAuthPageProps) => ReactElement;
}

/**
 * The authentication page component.
 *
 * This component represents a common layout for the login and register pages.
 *
 * @param props The component props
 */
export const AuthPage: FC<IAuthPageProps> = ({
    renderForm,
    title,
    text,
}) => (
    <div className={styles.page}>
        <div className={styles.container}>
            <div className={styles.inner}>
                <AuthHeader
                    title={title}
                    text={text}
                    className={styles.header}
                />

                {renderForm({ className: styles.form })}
            </div>
        </div>

        <Footer className={styles.footer} transparent />
    </div>
);
