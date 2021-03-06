/**
 * @file Use Register Form hook.
 * @author Andrey Glotov
 */

// Imports
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';

// App Imports
import { RegisterRequestParams } from '../../../../store/types/auth';

// Validation schema
const LoginSchema = Yup.object().shape({
    consent: Yup.boolean()
        .oneOf([ true ], 'Please check this box if you want to proceed'),
    email: Yup.string()
        .trim()
        .email('Please provide a valid email address')
        .required('This field is required'),
    fullName: Yup.string()
        .trim()
        .required('This field is required'),
    password: Yup.string()
        .min(6, 'Minimum length is 6 characters')
        .max(16, 'Maximum length is 16 characters')
        .matches(
            /^[a-zA-Z0-9]{6,16}$/,
            'Your password must contain only numbers and letters',
        )
        .required('This field is required'),
});

// Initial values
const initialValues: RegisterRequestParams = {
    consent: false,
    email: '',
    fullName: '',
    password: '',
};

/**
 * Configuration options for the Use Register Form hook.
 */
export interface IRegisterFormConfig {
    /** Is authentication currently in progress? */
    isFetching: boolean;

    /**
     * Callback fired when the login form is submitted.
     *
     * @param values Submitted values.
     */
    onSubmit: (values: RegisterRequestParams) => void;
}

/**
 * Behavior of the register form.
 *
 * @param config The configuration options.
 */
export function useRegisterForm(config: IRegisterFormConfig) {
    const { isFetching, onSubmit } = config;

    const formik = useFormik<RegisterRequestParams>({
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
