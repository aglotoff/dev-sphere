import classnames from 'classnames';
import React, { forwardRef, HTMLProps } from 'react';

import styles from './Input.module.scss';

export interface IInputProps extends HTMLProps<HTMLInputElement> {
    invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((
    { className, invalid, ...restProps },
    forwardedRef,
) => {
    const inputClass = classnames(
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
