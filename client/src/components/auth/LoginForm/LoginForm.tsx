import {
    faFacebookF,
    faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '../../common/Alert/Alert';
import Link from '../../common/Link/Link';
import AuthForm from '../AuthForm/AuthForm';

import { AppState } from '../../../store';
import { clearAuthError, login } from '../../../store/auth/actions';
import { ILoginData } from '../../../store/auth/types';

const initialValues = {
    email: '',
    password: '',
};

/**
 * Props for the login form component.
 */
interface ILoginFormProps {
    /** Additional class name for the form */
    className: string;
}

const LoginForm = (props: ILoginFormProps) => {
    const { className } = props;

    const dispatch = useDispatch();
    const errorMessage = useSelector((state: AppState) => state.auth.error);

    const onSubmit = (creds: ILoginData) => {
        dispatch(clearAuthError());
        dispatch(login(creds));
    };

    const handleAlertDismiss = () => {
        dispatch(clearAuthError());
    };

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
        <AuthForm className={className} onSubmit={handleSubmit}>
            <AuthForm.SocialButton
                href="/socialauth/facebook"
                icon={faFacebookF}
                theme="facebook"
            >
                Continue with Facebook
            </AuthForm.SocialButton>

            <AuthForm.SocialButton
                href="/socialauth/google"
                icon={faGoogle}
                theme="google"
            >
                Continue with Google
            </AuthForm.SocialButton>

            <AuthForm.Or />

            {errorMessage &&
                <Alert onDismiss={handleAlertDismiss}>{errorMessage}</Alert>
            }

            <AuthForm.Field
                type="text"
                name="email"
                placeholder="Type email"
                onChange={handleChange}
                value={values.email}
            />

            <AuthForm.Field
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
            />

            <AuthForm.Submit disabled={isSubmitting}>
                Login Now
            </AuthForm.Submit>

            <AuthForm.Callout>
                Don’t have an account?
                {' '}
                <Link to="/register">Register Now</Link>
            </AuthForm.Callout>
        </AuthForm>
    );
};

export default LoginForm;
