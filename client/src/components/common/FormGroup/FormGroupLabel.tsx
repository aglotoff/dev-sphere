/**
 * @file Form Group Label container.
 * @author Andrey Glotov
 */

// Imports
import classNames from 'classnames';
import React, { FC, PropsWithChildren } from 'react';

// CSS Imports
import styles from './FormGroup.module.scss';

/**
 * Props for the Form Group Label component.
 */
export interface IFormGroupLabelProps {
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
export const FormGroupLabel: FC<PropsWithChildren<IFormGroupLabelProps>> = ({
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
