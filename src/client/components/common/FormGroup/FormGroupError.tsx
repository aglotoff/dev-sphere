/**
 * @file Form Group Error container.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';

// CSS Imports
import styles from './FormGroup.module.scss';

/**
 * Props for the Form Group Error component.
 */
export interface FormGroupErrorProps {
    /** ID of the error element. */
    id?: string;
}

/**
 * Error message displayed on the bottom of a FormGroup component.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const FormGroupError: FC<FormGroupErrorProps> = ({
    children,
    id,
}) => (
    <div className={styles.error} id={id}>
        {children}
    </div>
);
