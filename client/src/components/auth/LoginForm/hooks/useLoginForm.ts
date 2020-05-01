/**
 * @file Use Login Form hook.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';

/**
 * Shape of login form fields.
 */
export interface ILoginFormValues {
    /** User email. */
    email: string;
    /** User password. */
    password: string;
}

// Validation schema
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .required('This field is required'),
    password: Yup.string()
        .required('This field is required'),
});

// Initial values
const initialValues: ILoginFormValues = {
    email: '',
    password: '',
};

/**
 * Configuration options for the Use Login Form hook.
 */
export interface ILoginFormConfig {
    /** Is authentication currently in progress? */
    isFetching: boolean;

    /**
     * Callback fired when the login form is submitted.
     *
     * @param values Submitted values.
     */
    onSubmit: (values: ILoginFormValues) => void;
}

/**
 * Behavior of the login form.
 *
 * @param config The configuration options.
 */
export function useLoginForm(config: ILoginFormConfig) {
    const { isFetching, onSubmit } = config;

    const formik = useFormik<ILoginFormValues>({
        initialValues,
        onSubmit,
        validationSchema: LoginSchema,
    });
    const { setSubmitting } = formik;

    // Keep the submitting state in sync with the store.
    useEffect(() => {
        setSubmitting(isFetching);
    }, [ isFetching, setSubmitting ]);

    return formik;
}
