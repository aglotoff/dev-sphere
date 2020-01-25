/**
 * @file The checkbox component.
 * @author Andrey Glotov
 */

import {
    faCheckSquare,
    faSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { forwardRef, HTMLProps } from 'react';

import styles from './Checkbox.module.scss';

/**
 * Props for the Checkbox component.
 */
export type ICheckboxProps = HTMLProps<HTMLInputElement>;

/**
 * Checkbox component.
 *
 * Use this styled version instead of a native checkbox.
 */
export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>((
    { className, ...restProps },
    forwardedRef,
) => (
    <label className={className}>
        <input
            {...restProps}
            type="checkbox"
            ref={forwardedRef}
            className={styles.input}
        />

        <span className={styles.square}>
            <FontAwesomeIcon
                className={styles.icon}
                icon={faSquare}
            />
            <FontAwesomeIcon
                className={classNames(styles.icon, styles.icon_checked)}
                icon={faCheckSquare}
            />
        </span>
    </label>
));
