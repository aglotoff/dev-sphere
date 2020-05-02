/**
 * @file Page Loader component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';

// UI Imports
import { Loader } from '../../common/Loader';

// CSS Imports
import styles from './Page.module.scss';

/**
 * Indicator to be displayed while the page is loading.
 */
export const PageLoader: FC = () => (
    <div className={styles.loaderContainer}>
        <Loader className={styles.loader}>
            The page is loading...
        </Loader>
    </div>
);
