/**
 * @file Input Field component.
 * @author Andrey Glotov
 */

// Imports
import classNames from 'classnames';
import React, { forwardRef, HTMLProps } from 'react';

// CSS Imports
import styles from './Input.module.scss';

/**
 * Props for the Input Field component.
 */
export interface IInputProps extends HTMLProps<HTMLInputElement> {
    invalid?: boolean;
}

/**
 * Reusable test input with predefined styles.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Input = forwardRef<HTMLInputElement, IInputProps>((
    { className, invalid, ...restProps },
    forwardedRef,
) => {
    const inputClass = classNames(
        styles.input,
        invalid && styles.input_invalid,
        className,
    );

    return (
        <input
            {...restProps}
            ref={forwardedRef}
            className={inputClass}
        />
    );
});
