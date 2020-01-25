import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { IRegisterFormProps, RegisterForm } from '../RegisterForm';

import { register } from '../../../store/actions/api';
import { IRegisterParams } from '../../../store/types/api';

import useAuthError from '../../../hooks/useAuthError';

export type IRegisterFormContainerProps = Omit<
    IRegisterFormProps,
    'errorMessage' | 'onAlertDismiss' | 'onSubmit'
>;

export const RegisterFormContainer: FC<
    IRegisterFormContainerProps
> = (props) => {
    const dispatch = useDispatch();

    const [ error, dismissError ] = useAuthError();

    const handleSubmit = (creds: IRegisterParams) => {
        dispatch(register({
            fullName: creds.fullName,
            email: creds.email,
            password: creds.password,
        }));
    };

    return (
        <RegisterForm
            {...props}
            errorMessage={error}
            onSubmit={handleSubmit}
            onAlertDismiss={dismissError}
        />
    );
};
