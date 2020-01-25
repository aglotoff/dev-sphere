/**
 * @file The authentication form checkbox component.
 * @author Andrey Glotov
 */

import React, {
    FC,
    PropsWithChildren,
} from 'react';

import { Checkbox, ICheckboxProps } from '../../common/Checkbox';

import styles from './AuthForm.module.scss';

/**
 * Props for the authentication form checkbox component.
 */
export type IAuthFormCheckboxProps = Omit<ICheckboxProps, 'ref'> & {
    /** Error message if the field is invalid. */
    error?: string;
};

/**
 * The component for displaying authentication form checkboxes.
 *
 * @param props The component props.
 */
export const AuthFormCheckbox: FC<
    PropsWithChildren<IAuthFormCheckboxProps>
> = ({
    children,
    error,
    id,
    ...restProps
}) => (
    <div className={styles.checkbox}>
        <Checkbox id={id} {...restProps} />
        <label htmlFor={id} className={styles.checkboxLabel}>
            {children}
        </label>
        {error && <p className={styles.fieldError}>{error}</p>}
    </div>
);
