import qs from 'query-string';
import React, { useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import AuthPage from '../../auth/AuthPage/AuthPage';
import LoginForm from '../../auth/LoginForm/LoginForm';

import { clearAuthError, setAuthError } from '../../../store/actions/api';

const LoginPage = (props: RouteComponentProps) => {
    const { location } = props;
    const { error } = qs.parse(location.search);

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            dispatch(setAuthError(error as string));
        }

        return () => {
            dispatch(clearAuthError());
        };
    }, [ dispatch, error ]);

    return (
        <DocumentTitle title="Login">
            <AuthPage
                title="Login Now"
                text="This is a toy application, so feel free to use a fake name and non-existent email for registration!"
                renderForm={(injectedProps) => <LoginForm { ...injectedProps } />}
            />
        </DocumentTitle>
    );
};

export default LoginPage;
