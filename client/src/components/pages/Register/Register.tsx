import React from 'react';
import DocumentTitle from 'react-document-title';

import AuthPage from '../../auth/AuthPage/AuthPage';
import RegisterForm from '../../auth/RegisterForm/RegisterForm';

const RegisterPage = () => (
    <DocumentTitle title="Register">
        <AuthPage
            title="Register Now"
            text="This is a toy application, so feel free to use a fake name and non-existent email for registration!"
            renderForm={(injectedProps) => <RegisterForm { ...injectedProps } />}
        />
    </DocumentTitle>
);

export default RegisterPage;
