/**
 * @file Login Form Container component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI Imports
import { LoginForm } from './LoginForm';

// App Imports
import { clearAuthError, login } from '../../../store/actions/auth';
import { getIsAuthenticating } from '../../../store/selectors/auth';
import { LoginRequestParams } from '../../../store/types/auth';

// Hooks Imports
import { useURLError } from '../../../hooks';

/**
 * Container component for the Login Form.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const LoginFormContainer: FC = () => {
    const error = useURLError();

    const isAuthenticating = useSelector(getIsAuthenticating);

    const dispatch = useDispatch();

    const handleSubmit = (creds: LoginRequestParams) => {
        dispatch(login(creds));
    };

    const handleDismissError = () => {
        dispatch(clearAuthError());
    };

    return (
        <LoginForm
            errorMessage={error && error.message}
            isFetching={isAuthenticating}
            onSubmit={handleSubmit}
            onDismissError={handleDismissError}
        />
    );
};
