/**
 * @file Authentication form iput field.
 * @author Andrey Glotov
 */

import React from 'react';

import Input from '../../common/Input/Input';

import styles from './AuthForm.module.scss';

/**
 * Props for the authentication form field component
 */
export interface IAuthFormFieldProps {
    /** Name of the input field */
    name: string;

    /** Type of the input field */
    type: 'text' | 'password';

    /** Placeholder text */
    placeholder?: string;

    /** Current value for the input field */
    value?: string;

    /** Validation error for the input field */
    error?: string;

    /** Handler for the input change event */
    onChange: (e: string | React.ChangeEvent<any>) => void;
}

/**
 * The component for displaying authentication form input fields.
 *
 * @param props The component props
 */
const AuthFormField = (props: IAuthFormFieldProps) => {
    const { error, ...restProps } = props;

    return (
        <div className={styles.field}>
            <Input {...restProps} invalid={!!error} />
            {error && <p className={styles.fieldError}>{error}</p>}
        </div>
    );
};

export default AuthFormField;
