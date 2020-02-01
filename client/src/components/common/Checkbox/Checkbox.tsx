/**
 * @file The checkbox component.
 * @author Andrey Glotov
 */

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { forwardRef, HTMLProps } from 'react';

import styles from './Checkbox.module.scss';

/**
 * Props for the Checkbox component.
 */
export type ICheckboxProps = HTMLProps<HTMLInputElement> & {
    invalid?: boolean;
};

/**
 * Checkbox component.
 *
 * Use this styled version instead of a native checkbox.
 */
export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>((
    { className, invalid, ...restProps },
    forwardedRef,
) => {
    const checkClass = classNames(
        styles.checkbox,
        invalid && styles.checkbox_invalid,
        classNames,
    )

    return (
        <label className={checkClass}>
            <input
                {...restProps}
                type="checkbox"
                ref={forwardedRef}
                className={styles.input}
            />

            <span className={styles.square}>
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={faCheck}
                />
            </span>
        </label>
    );
});
