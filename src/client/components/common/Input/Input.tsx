/**
 * @file Input Field component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import classNames from 'classnames';
import React, { forwardRef, HTMLProps } from 'react';

// CSS Imports
import styles from './Input.module.scss';

/**
 * Props for the Input Field component.
 */
export interface InputProps extends HTMLProps<HTMLInputElement> {
    invalid?: boolean;
}

/**
 * Reusable test input with predefined styles.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((
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
            aria-invalid={invalid ? 'true' : undefined}
            ref={forwardedRef}
            className={inputClass}
            {...restProps}
        />
    );
});
