/**
 * @file Error 404 component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';

// CSS Imports
import styles from './Error404.module.scss';

// Asset Imports
import image from '../../../assets/images/404.svg';

/**
 * Error 404 (Page Not Found).
 *
 * @returns The element to render.
 */
export const Error404: FC = () => (
    <div className={styles.container}>
        <div className={styles.inner}>
            <h1 className={styles.error}>
                <img
                    className={styles.img}
                    src={image}
                    alt="Page Not Found"
                />
            </h1>
        </div>
    </div>
);
