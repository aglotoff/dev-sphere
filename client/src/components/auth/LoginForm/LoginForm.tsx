import {
    faFacebookF,
    faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react';

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

    isAuthenticating: boolean;
}

export const LoginForm: FC<ILoginFormProps> = ({
    className,
    errorMessage,
    isAuthenticating,
    onAlertDismiss,
    onSubmit,
}) => {
    const {
        handleChange,
        handleSubmit,
        setSubmitting,
        values,
    } = useFormik<ILoginParams>({
        initialValues,
        onSubmit,
    });

    useEffect(() => {
        if (!isAuthenticating) {
            setSubmitting(false);
        }
    }, [ isAuthenticating, setSubmitting ]);

    return (
        <AuthForm
            className={className}
            onSubmit={handleSubmit}
        >
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

            <AuthForm.Submit
                animateSpinner={isAuthenticating}
                disabled={isAuthenticating}
                icon={isAuthenticating ? faSpinner : undefined}
            >
                Login Now
            </AuthForm.Submit>

            <AuthForm.Callout>
                Don’t have an account?
                {' '}
                <Link href="/register">Register Now</Link>
            </AuthForm.Callout>
        </AuthForm>
    );
};
