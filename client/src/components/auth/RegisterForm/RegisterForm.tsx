import { FormikErrors, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '../../common/Alert/Alert';
import Link from '../../common/Link/Link';
import AuthForm from '../AuthForm/AuthForm';

import { AppState } from '../../../store';
import { clearApiError, register } from '../../../store/api/actions';
import { IRegisterData } from '../../../store/api/types';

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
interface IRegisterFormProps {
    /** Additional class name for the form */
    className: string;
}

const RegisterForm = (props: IRegisterFormProps) => {
    const { className } = props;

    const dispatch = useDispatch();
    const errorMessage = useSelector((state: AppState) => state.api.error);

    const onSubmit = (creds: IRegisterData) => {
        dispatch(clearApiError());
        dispatch(register(creds));
    };

    const handleAlertDismiss = () => {
        dispatch(clearApiError());
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
        setFieldValue,
    } = useFormik<IRegisterData>({
        initialValues,
        onSubmit,
        validate,
    });

    return (
        <AuthForm className={className} onSubmit={handleSubmit}>
            <AuthForm.Title>Sign Up to DevCircle</AuthForm.Title>

            {errorMessage &&
                <Alert onDismiss={handleAlertDismiss}>{errorMessage}</Alert>
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
                    const target = e.target;
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

export default RegisterForm;
