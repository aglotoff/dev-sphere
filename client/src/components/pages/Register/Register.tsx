import React, { FC } from 'react';
import DocumentTitle from 'react-document-title';

import { AuthPage } from '../../auth/AuthPage';
import { RegisterFormContainer } from '../../auth/RegisterForm';

export const Register: FC = () => (
    <DocumentTitle title="Register | DevSphere">
        <AuthPage
            title="Register Now"
            text={
                'This is a toy application, so feel free to use a fake name ' +
                'and non-existent email for registration!'
            }
            renderForm={(injectedProps) => (
                <RegisterFormContainer { ...injectedProps } />
            )}
        />
    </DocumentTitle>
);
