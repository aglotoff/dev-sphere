/**
 * @file Form Checkbox component
 * @author Andrey Glotov
 */

// Imports
import React, { ChangeEventHandler, FC, PropsWithChildren } from 'react';

// UI Imports
import { Checkbox } from '../Checkbox';
import { FormGroup, FormGroupError } from '../FormGroup';

// CSS Imports
import styles from './FormCheck.module.scss';

/**
 * Props for the Form Checkbox component.
 */
export interface IFormCheckProps {
    /** Additional class name. */
    className?: string;
    /** Optional error message. */
    error?: string;
    /** ID of the checkbox element. */
    id?: string;
    /** Name of the checkbox element. */
    name?: string;
    /** Is the checkbox selected. */
    checked?: boolean;

    /** Callback fired when the value of the element is changed. */
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

/**
 * Checkbox with label and optional error message.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const FormCheck: FC<PropsWithChildren<IFormCheckProps>> = ({
    checked,
    children,
    className,
    error,
    id,
    name,
    onChange,
}) => (
    <FormGroup className={className}>
        <div className={styles.container}>
            <Checkbox
                aria-describedby={error ? `${id}-error` : undefined}
                aria-labelledby={`${id}-label`}
                checked={checked}
                id={id}
                invalid={!!error}
                name={name}
                onChange={onChange}
            />

            <label htmlFor={id} className={styles.label}>
                {children}
            </label>
        </div>

        {error && (
            <FormGroupError id={`${id}-error`}>{error}</FormGroupError>
        )}
    </FormGroup>
);
