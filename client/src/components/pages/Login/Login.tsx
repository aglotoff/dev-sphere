import React, { FC } from 'react';
import DocumentTitle from 'react-document-title';

import { AuthPage } from '../../auth/AuthPage';
import { LoginFormContainer } from '../../auth/LoginForm';

export const Login: FC = () => (
    <DocumentTitle title="Login | DevSphere">
        <AuthPage
            title="Login Now"
            text={
                'This is a toy application, so feel free to use a fake name ' +
                'and non-existent email for registration!'
            }
            renderForm={(injectedProps) => (
                <LoginFormContainer { ...injectedProps } />
            )}
        />
    </DocumentTitle>
);
