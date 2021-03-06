/**
 * @file Checkbox component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { forwardRef, HTMLProps } from 'react';

// CSS Imports
import styles from './Checkbox.module.scss';

/**
 * Props for the Checkbox component.
 */
export type CheckboxProps = HTMLProps<HTMLInputElement> & {
    /** Apply styles to indicate invalid state? */
    invalid?: boolean;
};

/**
 * Checkbox component with customized look and feel.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((
    { className, invalid, ...restProps },
    forwardedRef,
) => {
    const checkClass = classNames(
        styles.checkbox,
        invalid && styles.checkbox_invalid,
        classNames,
    );

    return (
        <label className={checkClass}>
            <input
                className={styles.input}
                ref={forwardedRef}
                type="checkbox"
                {...restProps}
            />

            <span aria-hidden="true" className={styles.square}>
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={faCheck}
                />
            </span>
        </label>
    );
});
