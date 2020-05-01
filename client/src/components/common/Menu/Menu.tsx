/**
 * @file Menu component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC, PropsWithChildren } from 'react';

// CSS Imports
import styles from './Menu.module.scss';

/**
 * Generic menu component.
 *
 * Displays vertical list of choices. Expects children to be `<MenuItem>`
 * components.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const Menu: FC<PropsWithChildren<{}>> = ({ children }) => (
    <ul className={styles.menu}>
        {children}
    </ul>
);
