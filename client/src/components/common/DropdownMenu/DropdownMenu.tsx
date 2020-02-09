/**
 * @file Dropdown Menu component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC, PropsWithChildren } from 'react';

// UI Imports
import { DropdownMenuItem } from './DropdownMenuItem';

// CSS Imports
import styles from './DropdownMenu.module.scss';

type DropdownMenuType = FC<PropsWithChildren<{}>> & {
    Item: typeof DropdownMenuItem;
};

/**
 * Dropdown menu.
 */
export const DropdownMenu: DropdownMenuType = ({ children }) => (
    <ul className={styles.menu}>
        {children}
    </ul>
);
DropdownMenu.Item = DropdownMenuItem;
