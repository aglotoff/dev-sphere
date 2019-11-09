import { FormikErrors, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../store';
import { clearApiError, register } from '../../store/api/actions';
import { IRegisterData } from '../../store/api/types';

const validate = (values: IRegisterData) => {
    const errors: FormikErrors<IRegisterData> = {};

    const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.fullName) {
        errors.fullName = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!EMAIL_REGEXP.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
};

const initialValues = {
    fullName: '',
    email: '',
    password: '',
};

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state: AppState) => state.api.error);

    const onSubmit = (creds: IRegisterData) => {
        dispatch(clearApiError());
        dispatch(register(creds));
    };

    useEffect(() => {
        return () => {
            dispatch(clearApiError());
        };
    }, [ dispatch ]);

    const {
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
    } = useFormik<IRegisterData>({
        initialValues,
        onSubmit,
        validate,
    });

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register Now</h1>

            {errorMessage && <p>{errorMessage}</p>}

            <div>
                <label
                    htmlFor="login-name"
                    id="login-name-label"
                >Full Name</label>
                <input
                    id="login-full-name"
                    aria-labelledby="login-full-name-label"
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    onChange={handleChange}
                    value={values.fullName}
                />
                {touched.fullName && touched.fullName && <p>{errors.fullName}</p>}
            </div>
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
                {touched.email && touched.email && <p>{errors.email}</p>}
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
                {touched.password && touched.password && <p>{errors.password}</p>}
            </div>
            <div>
                <button type="submit" disabled={isSubmitting}>Register Now</button>
            </div>
        </form>
    );
};

export default Register;
