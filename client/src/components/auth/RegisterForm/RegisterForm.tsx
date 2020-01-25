import { FormikErrors, useFormik } from 'formik';
import React, { FC } from 'react';

import { Alert } from '../../common/Alert';
import { Link } from '../../common/Link';
import { AuthForm } from '../AuthForm';

import { IRegisterParams } from '../../../store/types/api';

interface IRegisterValues extends IRegisterParams {
    agree: boolean;
}

const validate = (values: IRegisterValues) => {
    const errors: FormikErrors<IRegisterValues> = {};

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

    if (!values.agree) {
        errors.agree = 'Required';
    }

    return errors;
};

const initialValues = {
    fullName: '',
    email: '',
    password: '',
    agree: false,
};

/**
 * Props for the register form component.
 */
export interface IRegisterFormProps {
    /** Additional class name for the form */
    className?: string;

    onSubmit: (creds: IRegisterParams) => void;

    onAlertDismiss: () => void;

    errorMessage?: string | null;
}

export const RegisterForm: FC<IRegisterFormProps> = ({
    className,
    errorMessage,
    onAlertDismiss,
    onSubmit,
}) => {
    const {
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue,
    } = useFormik<IRegisterValues>({
        initialValues,
        onSubmit,
        validate,
    });

    return (
        <AuthForm className={className} onSubmit={handleSubmit}>
            <AuthForm.Title>Sign Up to DevCircle</AuthForm.Title>

            {errorMessage &&
                <Alert onDismiss={onAlertDismiss}>{errorMessage}</Alert>
            }

            <AuthForm.Field
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                value={values.fullName}
                error={touched.fullName ? errors.fullName : undefined}
            />

            <AuthForm.Field
                type="text"
                name="email"
                placeholder="Type email"
                onChange={handleChange}
                value={values.email}
                error={touched.email ? errors.email : undefined}
            />

            <AuthForm.Field
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                error={touched.password ? errors.password : undefined}
            />

            <AuthForm.Checkbox
                id="terms"
                name="agree"
                onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    console.log(target.name, target.checked);
                    setFieldValue(target.name, target.checked);
                }}
                checked={values.agree}
                error={touched.agree ? errors.agree : undefined}
            >
                I agree to DevCircle’s
                {' '}
                <Link theme="alt" to="/terms">Terms of Service</Link>
                ,
                {' '}
                <Link theme="alt" to="/policy">Policy</Link>
                {' '}
                and
                {' '}
                <Link theme="alt" to="/content-policies">Content Policies</Link>.
            </AuthForm.Checkbox>

            <AuthForm.Submit disabled={isSubmitting}>
                Register Now
            </AuthForm.Submit>

            <AuthForm.Callout>
                If you have an account?
                {' '}
                <Link to="/login">Login</Link>
            </AuthForm.Callout>
        </AuthForm>
    );
};
