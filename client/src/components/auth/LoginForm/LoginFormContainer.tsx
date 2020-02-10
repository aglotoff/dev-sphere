import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoginForm } from './LoginForm';

import { login } from '../../../store/actions/api';
import { getIsAuthenticating } from '../../../store/reducers/api';
import { ILoginParams } from '../../../store/types/api';

import useAuthError from '../../../hooks/useAuthError';

export interface ILoginFormContainerProps {
    className?: string;
}

export const LoginFormContainer: FC<ILoginFormContainerProps> = ({
    className,
}) => {
    const isAuthenticating = useSelector(getIsAuthenticating);
    const dispatch = useDispatch();

    const [ error, dismissError ] = useAuthError();

    const handleSubmit = (creds: ILoginParams) => {
        dispatch(login(creds));
    };

    return (
        <LoginForm
            className={className}
            errorMessage={error}
            isAuthenticating={isAuthenticating}
            onSubmit={handleSubmit}
            onAlertDismiss={dismissError}
        />
    );
};
