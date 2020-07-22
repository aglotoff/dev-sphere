/**
 * @file The Register page.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { AuthPage } from '../../auth/AuthPage';
import { RegisterFormContainer } from '../../auth/RegisterForm';

/**
 * The Application Register page.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const Register: FC = () => (
    <AuthPage heading="Register Now" title="Register">
        <RegisterFormContainer />
    </AuthPage>
);
