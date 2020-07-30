/**
 * @file Loader component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import classNames from 'classnames';
import React, { FC } from 'react';

// CSS Imports
import styles from './Loader.module.scss';

/**
 * Props for the Loader component.
 */
export interface LoaderProps {
    /** Additional class name. */
    className?: string;
}

/**
 * Animated loading indicator.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Loader: FC<LoaderProps> = ({
    children,
    className,
}) => (
    <span className={classNames(styles.loader, className)}>
        <span className={styles.text}>
            {children}
        </span>
    </span>
);
