import React from 'react';
import DocumentTitle from 'react-document-title';

import AuthPage from '../../auth/AuthPage/AuthPage';
import LoginForm from '../../auth/LoginForm/LoginForm';

const LoginPage = () => (
    <DocumentTitle title="Login">
        <AuthPage
            title="Login Now"
            text="This is a toy application, so feel free to use a fake name and non-existent email for registration!"
            renderForm={(injectedProps) => <LoginForm { ...injectedProps } />}
        />
    </DocumentTitle>
);

export default LoginPage;
