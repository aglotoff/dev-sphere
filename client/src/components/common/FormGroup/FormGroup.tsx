/**
 * @file Form Group container.
 * @author Andrey Glotov
 */

// Imports
import classNames from 'classnames';
import React, { FC, PropsWithChildren } from 'react';

// CSS Imports
import styles from './FormGroup.module.scss';

/**
 * Props for the Form Group component.
 */
export interface IFormGroupProps {
    /** Additional class name. */
    className?: string;
}

/**
 * Wrapper for input elements with support for a label and error message.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const FormGroup: FC<PropsWithChildren<IFormGroupProps>> = ({
    children,
    className,
}) => (
    <div className={classNames(styles.group, className)}>
        {children}
    </div>
);
