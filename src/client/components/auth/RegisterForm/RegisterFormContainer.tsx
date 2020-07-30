/**
 * @file Register Form Container component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI Imports
import { RegisterForm } from './RegisterForm';

// App Imports
import { clearAuthError, register } from '../../../store/actions/auth';
import { getIsAuthenticating } from '../../../store/selectors/auth';
import { RegisterRequestParams } from '../../../store/types/auth';

// Hooks Imports
import { useURLError } from '../../../hooks';

/**
 * Container component for the Register Form.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const RegisterFormContainer: FC = () => {
    const error = useURLError();

    const isAuthenticating = useSelector(getIsAuthenticating);

    const dispatch = useDispatch();

    const handleSubmit = (creds: RegisterRequestParams) => {
        dispatch(register(creds));
    };

    const handleDismissError = () => {
        dispatch(clearAuthError());
    };

    return (
        <RegisterForm
            isFetching={isAuthenticating}
            errorMessage={error && error.message}
            onSubmit={handleSubmit}
            onDismissError={handleDismissError}
        />
    );
};
