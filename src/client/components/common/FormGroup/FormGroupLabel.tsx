/**
 * @file Form Group Label container.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import classNames from 'classnames';
import React, { FC } from 'react';

// CSS Imports
import styles from './FormGroup.module.scss';

/**
 * Props for the Form Group Label component.
 */
export interface FormGroupLabelProps {
    /** Visually hide the label (but leave accessible to screen readers). */
    hidden?: boolean;
    /** ID of the form element this label is bound to. */
    htmlFor?: string;
    /* ID of the label. */
    id?: string;
}

/**
 * Optionally hidden label displayed on the top of a FormGroup component.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const FormGroupLabel: FC<FormGroupLabelProps> = ({
    children,
    hidden,
    htmlFor,
    id,
}) => (
    <label
        className={classNames(styles.label, hidden && styles.label_hidden)}
        htmlFor={htmlFor}
        id={id}
    >
        {children}
    </label>
);
