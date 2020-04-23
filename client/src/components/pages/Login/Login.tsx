/**
 * @file The Login page.
 * @author Andrey Glotov
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { AuthPage } from '../../auth/AuthPage';
import { LoginFormContainer } from '../../auth/LoginForm';

/**
 * The Application Login page.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const Login: FC = () => (
    <AuthPage heading="Login Now" title="Login | DevSphere">
        <LoginFormContainer />
    </AuthPage>
);
