/**
 * @file Login Form Container component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI Imports
import { LoginForm } from './LoginForm';

// App Imports
import { login } from '../../../store/actions/api';
import { clearError } from '../../../store/actions/error';
import { getIsAuthenticating } from '../../../store/reducers/api';
import { ILoginParams } from '../../../store/types/api';

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

    const handleSubmit = (creds: ILoginParams) => {
        dispatch(login(creds));
    };

    const handleDismissError = () => {
        dispatch(clearError());
    };

    return (
        <LoginForm
            errorMessage={error}
            isFetching={isAuthenticating}
            onSubmit={handleSubmit}
            onDismissError={handleDismissError}
        />
    );
};
