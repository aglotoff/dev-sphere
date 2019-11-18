import React, { useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { useDispatch } from 'react-redux';

import AuthPage from '../../auth/AuthPage/AuthPage';
import RegisterForm from '../../auth/RegisterForm/RegisterForm';

import { clearAuthError } from '../../../store/auth/actions';

const RegisterPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearAuthError());
        };
    }, [ dispatch ]);

    return (
        <DocumentTitle title="Register">
            <AuthPage
                title="Register Now"
                text="This is a toy application, so feel free to use a fake name and non-existent email for registration!"
                renderForm={(injectedProps) => <RegisterForm { ...injectedProps } />}
            />
        </DocumentTitle>
    );
};

export default RegisterPage;
