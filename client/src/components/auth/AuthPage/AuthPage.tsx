/**
 * @file The authentication page component
 * @author Andrey Glotov
 */

import React from 'react';

import AuthHeader from '../../auth/AuthHeader/AuthHeader';

import styles from './AuthPage.module.scss';

/**
 * Props injected to the child form component.
 */
export interface IInjectedAuthPageProps {
    /** Additional class name for the form */
    className: string;
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
    renderForm: (injectedProps: IInjectedAuthPageProps) => JSX.Element;
}

/**
 * The authentication page component.
 *
 * This component represents a common layout for the login and register pages.
 *
 * @param props The component props
 */
const AuthPage = (props: IAuthPageProps) => {
    const { renderForm, title, text } = props;

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <AuthHeader
                    title={title}
                    text={text}
                    className={styles.header}
                />
                {renderForm({ className: styles.form })}
            </div>
        </div>
    );
};

export default AuthPage;
