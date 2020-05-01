/**
 * @file Register Form component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { Alert } from '../../common/Alert';
import { FormCheck } from '../../common/FormCheck';
import { FormInput } from '../../common/FormInput';
import { Link } from '../../common/Link';
import { SubmitButton } from '../../common/SubmitButton';

// Hooks Imports
import { IRegisterFormValues, useRegisterForm } from './hooks';

// CSS Imports
import styles from './RegisterForm.module.scss';

/**
 * Props for the register form component.
 */
export interface IRegisterFormProps {
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
    onSubmit: (values: IRegisterFormValues) => void;
}

/**
 * Application register form.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const RegisterForm: FC<IRegisterFormProps> = ({
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
    } = useRegisterForm({
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
            <h2 className={styles.title}>Sign Up to DevCircle</h2>

            {errorMessage &&
                <Alert onDismiss={onDismissError}>{errorMessage}</Alert>
            }

            <FormInput
                className={styles.field}
                error={touched.fullName ? errors.fullName : undefined}
                hideLabel
                id="register-full-name"
                label="Full Name"
                name="fullName"
                onChange={handleChange}
                placeholder="Full Name"
                value={values.fullName}
            />

            <FormInput
                className={styles.field}
                error={touched.email ? errors.email : undefined}
                hideLabel
                id="register-email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                value={values.email}
            />

            <FormInput
                className={styles.field}
                error={touched.password ? errors.password : undefined}
                hideLabel
                id="register-password"
                label="Password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                value={values.password}
            />

            <FormCheck
                checked={values.consent}
                className={styles.field}
                error={touched.consent ? errors.consent : undefined}
                id="consent"
                name="consent"
                onChange={handleChange}
            >
                {'I agree to DevCircle’s '}
                <Link theme="alt" href="/terms">
                    Terms of Service
                </Link>
                {', '}
                <Link theme="alt" href="/policy">
                    Policy
                </Link>
                {' and '}
                <Link theme="alt" href="/content-policies">
                    Content Policies
                </Link>
                .
            </FormCheck>

            <SubmitButton
                className={styles.submitButton}
                isSubmitting={isSubmitting}
            >
                Register Now
            </SubmitButton>

            <div className={styles.bottomText}>
                If you have an account?
                {' '}
                <Link href="/login">Login</Link>
            </div>
        </form>
    );
};
