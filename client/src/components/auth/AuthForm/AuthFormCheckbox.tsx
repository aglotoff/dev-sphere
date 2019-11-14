/**
 * @file
 * @author Andrey Glotov
 */

import React, { PropsWithChildren } from 'react';

import Checkbox from '../../common/Checkbox/Checkbox';

import styles from './AuthForm.module.scss';

/**
 * Props for the authentication form field component
 */
export interface IAuthFormCheckboxProps {
    /** Name of the input field */
    name: string;

    id: string;

    checked: boolean;

    error?: string;

    /** Handler for the input change event */
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * The component for displaying authentication form input fields.
 *
 * @param props The component props
 */
const AuthFormCheckbox = (props: PropsWithChildren<IAuthFormCheckboxProps>) => {
    const { children, error, id, ...restProps } = props;

    return (
        <div className={styles.checkbox}>
            <Checkbox id={id} {...restProps} />
            <label htmlFor={id} className={styles.checkboxLabel}>
                {children}
            </label>
            {error && <p className={styles.fieldError}>{error}</p>}
        </div>
    );
};

export default AuthFormCheckbox;
