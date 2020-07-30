/**
 * @file Login Form component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import React, { FC } from 'react';

// UI Imports
import { Alert } from '../../common/Alert';
import { Button } from '../../common/Button';
import { FormInput } from '../../common/FormInput';
import { Link } from '../../common/Link';
import { SubmitButton } from '../../common/SubmitButton';

// App Imports
import { LoginRequestParams } from '../../../store/types/auth';

// Hooks Imports
import { useLoginForm } from './hooks';

// CSS Imports
import styles from './LoginForm.module.scss';

/**
 * Props for the login form component.
 */
export interface ILoginFormProps {
    /** API error message (displayed inside an alert box). */
    errorMessage?: string | null;
    /** Is authentication currently in progress? */
    isFetching: boolean;

    /**
     * Callback fired when the user dismisser the alert box.
     */
    onDismissError: () => void;
    /**
     * Callback fired when the user submits the form.
     *
     * @param values The submitted values.
     */
    onSubmit: (values: LoginRequestParams) => void;
}

/**
 * Application login form.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const LoginForm: FC<ILoginFormProps> = ({
    errorMessage,
    isFetching,
    onDismissError,
    onSubmit,
}) => {
    const {
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
    } = useLoginForm({
        isFetching,
        onSubmit,
    });

    return (
        <form
            className={styles.form}
            method="post"
            noValidate
            onSubmit={handleSubmit}
        >
            <Button
                className={styles.socialButton}
                href="/socialauth/facebook"
                icon={faFacebookF}
                size="lg"
                theme="facebook"
                type="button"
            >
                Continue with Facebook
            </Button>

            <Button
                className={styles.socialButton}
                href="/socialauth/google"
                icon={faGoogle}
                size="lg"
                theme="google"
                type="button"
            >
                Continue with Google
            </Button>

            <div className={styles.or}>Or</div>

            {errorMessage && (
                <Alert onDismiss={onDismissError}>{errorMessage}</Alert>
            )}

            <FormInput
                className={styles.field}
                error={touched.email ? errors.email : undefined}
                hideLabel
                id="login-email"
                label="Email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                type="email"
                value={values.email}
            />

            <FormInput
                className={styles.field}
                error={touched.password ? errors.password : undefined}
                hideLabel
                id="login-password"
                label="Password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                value={values.password}
            />

            <SubmitButton
                className={styles.submitButton}
                isSubmitting={isSubmitting}
            >
                Login Now
            </SubmitButton>

            <div className={styles.bottomText}>
                Don’t have an account?
                {' '}
                <Link href="/register">Register Now</Link>
            </div>
        </form>
    );
};
