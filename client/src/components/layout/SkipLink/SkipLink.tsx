/**
 * @file Skip Link component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC } from 'react';

// CSS Imports
import styles from './SkipLink.module.scss';

/**
 * Link that permits users to skip navigational material.
 *
 * @returns The element to render.
 */
export const SkipLink: FC = () => (
    <a className={styles.link} href="#content">
        Skip to content
    </a>
);
