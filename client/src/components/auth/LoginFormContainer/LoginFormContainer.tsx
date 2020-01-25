import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { ILoginFormProps, LoginForm } from '../LoginForm';

import { login } from '../../../store/actions/api';
import { ILoginParams } from '../../../store/types/api';

import useAuthError from '../../../hooks/useAuthError';

export type ILoginFormContainerProps = Omit<
    ILoginFormProps,
    'errorMessage' | 'onAlertDismiss' | 'onSubmit'
>;

export const LoginFormContainer: FC<ILoginFormContainerProps> = (props) => {
    const dispatch = useDispatch();

    const [ error, dismissError ] = useAuthError();

    const handleSubmit = (creds: ILoginParams) => {
        dispatch(login(creds));
    };

    return (
        <LoginForm
            {...props}
            errorMessage={error}
            onSubmit={handleSubmit}
            onAlertDismiss={dismissError}
        />
    );
};
