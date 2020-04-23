import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RegisterForm } from './RegisterForm';

import {
    clearAuthError,
    register,
    setAuthError,
} from '../../../store/actions/api';
import {
    getAuthError,
    getIsAuthenticating,
} from '../../../store/reducers/api';
import { IRegisterParams } from '../../../store/types/api';

import { useURLSearchParams } from '../../../hooks';

export const RegisterFormContainer: FC = (props) => {
    const authError = useSelector(getAuthError);
    const isAuthenticating = useSelector(getIsAuthenticating);

    const dispatch = useDispatch();

    const handleSubmit = (creds: IRegisterParams) => {
        dispatch(register({
            fullName: creds.fullName,
            email: creds.email,
            password: creds.password,
        }));
    };

    const urlSearchParams = useURLSearchParams();
    const urlError = urlSearchParams.get('error');

    useEffect(() => {
        if (urlError) {
            dispatch(setAuthError(urlError));

            return () => {
                dispatch(clearAuthError());
            };
        }
    }, [ dispatch, urlError ]);

    return (
        <RegisterForm
            {...props}
            isFetching={isAuthenticating}
            errorMessage={authError}
            onSubmit={handleSubmit}
            onDismissError={() => dispatch(clearAuthError())}
        />
    );
};
