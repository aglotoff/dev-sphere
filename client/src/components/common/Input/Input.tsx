import classnames from 'classnames';
import React, { HTMLProps } from 'react';

import styles from './Input.module.scss';

interface IInputProps extends HTMLProps<HTMLInputElement> {
    invalid?: boolean;
}

const Input = (props: IInputProps) => {
    const { className, invalid, ...restProps } = props;

    const inputClass = classnames(
        styles.input,
        invalid && styles.input_invalid,
        className,
    );

    return (
        <input {...restProps} className={inputClass} />
    );
};

export default Input;
