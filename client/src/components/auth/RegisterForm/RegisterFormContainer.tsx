/**
 * @file Register Form Container component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI Imports
import { RegisterForm } from './RegisterForm';

// App Imports
import { register } from '../../../store/actions/api';
import { clearError } from '../../../store/actions/error';
import { getIsAuthenticating } from '../../../store/reducers/api';
import { IRegisterParams } from '../../../store/types/api';

// Hooks Imports
import { useURLError } from '../../../hooks';

/**
 * Container component for the Register Form.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const RegisterFormContainer: FC = (props) => {
    const error = useURLError();

    const isAuthenticating = useSelector(getIsAuthenticating);

    const dispatch = useDispatch();

    const handleSubmit = (creds: IRegisterParams) => {
        dispatch(register({
            fullName: creds.fullName,
            email: creds.email,
            password: creds.password,
        }));
    };

    const handleDismissError = () => {
        dispatch(clearError());
    };

    return (
        <RegisterForm
            {...props}
            isFetching={isAuthenticating}
            errorMessage={error}
            onSubmit={handleSubmit}
            onDismissError={handleDismissError}
        />
    );
};
