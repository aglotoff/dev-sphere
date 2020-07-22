/**
 * @file Form Input component
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { ChangeEventHandler, FC } from 'react';

// UI Imports
import { FormGroup, FormGroupError, FormGroupLabel } from '../FormGroup';
import { Input } from '../Input';

/**
 * Props for the Form Input component.
 */
export interface IFormInputProps {
    /** Additional class name. */
    className?: string;
    /** Optional error message. */
    error?: string;
    /** Visually hide the label (but leave accessible to screen readers). */
    hideLabel?: boolean;
    /** ID of the input element. */
    id?: string;
    /** Name of the input element. */
    name?: string;
    /** Label for the input element. */
    label: string;
    /** Placeholder text for the input element. */
    placeholder?: string;
    /** TYpe of the input element ("text" by default). */
    type?: string;
    /** Value of the input element. */
    value?: string;

    /** Callback fired when the value of the input element is changed. */
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

/**
 * Input element with an optional label and error message.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const FormInput: FC<IFormInputProps> = ({
    className,
    error,
    hideLabel,
    id,
    label,
    name,
    onChange,
    placeholder,
    type,
    value,
}) => (
    <FormGroup className={className}>
        <FormGroupLabel
            hidden={hideLabel}
            htmlFor={id}
            id={id && `${id}-label`}
        >
            {label}
        </FormGroupLabel>

        <Input
            aria-describedby={error && id && `${id}-error`}
            aria-labelledby={id && `${id}-label`}
            id={id}
            invalid={!!error}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            type={type || 'text'}
            value={value}
        />

        {error && (
            <FormGroupError id={id && `${id}-error`}>
                {error}
            </FormGroupError>
        )}
    </FormGroup>
);
