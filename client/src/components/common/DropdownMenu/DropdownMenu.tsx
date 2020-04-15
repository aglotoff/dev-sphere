/**
 * @file Dropdown Menu component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC, PropsWithChildren } from 'react';

// CSS Imports
import styles from './DropdownMenu.module.scss';

/**
 * Menu to be displayed in dropdowns.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const DropdownMenu: FC<PropsWithChildren<{}>> = ({ children }) => (
    <ul className={styles.menu}>
        {children}
    </ul>
);
