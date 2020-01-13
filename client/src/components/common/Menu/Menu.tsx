/**
 * @file Menu List
 * @author Andrey Glotov
 */

import React, { PropsWithChildren } from 'react';

import MenuItem from './MenuItem';

import styles from './Menu.module.scss';

/**
 *
 *
 * @param props The component props
 */
const Menu = (props: PropsWithChildren<{}>) => (
    <ul className={styles.menu}>
        {props.children}
    </ul>
);

Menu.Item = MenuItem;

export {
    Menu as default,
    MenuItem,
};
