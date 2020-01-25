import {
    faFacebookF,
    faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { useFormik } from 'formik';
import React, { FC } from 'react';

import { Alert } from '../../common/Alert';
import { Link } from '../../common/Link';
import { AuthForm } from '../AuthForm/';

import { ILoginParams } from '../../../store/types/api';

const initialValues = {
    email: '',
    password: '',
};

/**
 * Props for the login form component.
 */
export interface ILoginFormProps {
    /** Additional class name for the form */
    className?: string;

    onSubmit: (creds: ILoginParams) => void;

    onAlertDismiss: () => void;

    errorMessage?: string | null;
}

export const LoginForm: FC<ILoginFormProps> = ({
    className,
    errorMessage,
    onAlertDismiss,
    onSubmit,
}) => {
    const {
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
    } = useFormik<ILoginParams>({
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
                <Alert onDismiss={onAlertDismiss}>{errorMessage}</Alert>
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
