import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../store';
import { clearApiError, login } from '../../store/api/actions';
import { ILoginData } from '../../store/api/types';

const initialValues = {
    email: '',
    password: '',
};

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state: AppState) => state.api.error);

    const onSubmit = (creds: ILoginData) => {
        dispatch(clearApiError());
        dispatch(login(creds));
    };

    useEffect(() => {
        return () => {
            dispatch(clearApiError());
        };
    }, [ dispatch ]);

    const {
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
    } = useFormik<ILoginData>({
        initialValues,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login Now</h1>

            {errorMessage && <p>{errorMessage}</p>}

            <div>
                <label
                    htmlFor="login-email"
                    id="login-email-label"
                >Email</label>
                <input
                    id="login-email"
                    aria-labelledby="login-email-label"
                    name="email"
                    type="text"
                    placeholder="Type email"
                    onChange={handleChange}
                    value={values.email}
                />
            </div>
            <div>
                <label
                    htmlFor="login-password"
                    id="login-password-label"
                >Password</label>
                <input
                    id="login-password"
                    aria-labelledby="login-password-label"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={values.password}
                />
            </div>
            <div>
                <button type="submit" disabled={isSubmitting}>Login Now</button>
            </div>
        </form>
    );
};

export default Login;
