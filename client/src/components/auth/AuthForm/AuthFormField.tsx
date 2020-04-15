/**
 * @file Authentication form iput field.
 * @author Andrey Glotov
 */

import React, { FC } from 'react';

import {  IInputProps, Input } from '../../common/Input';

import styles from './AuthForm.module.scss';

/**
 * Props for the authentication form field component
 */
export type IAuthFormFieldProps = Omit<IInputProps, 'invalid' | 'ref'> & {
    /** Validation error for the input field */
    error?: string;
};

/**
 * The component for displaying authentication form input fields.
 *
 * @param props The component props
 */
export const AuthFormField: FC<IAuthFormFieldProps> = ({
    error,
    ...restProps
}) => (
    <div className={styles.field}>
        <Input {...restProps} invalid={!!error} />
        {error && <p className={styles.fieldError}>{error}</p>}
    </div>
);
