/**
 * @file Menu List
 * @author Andrey Glotov
 */

import React, { PropsWithChildren } from 'react';

import MenuListItem from './MenuListItem';

import styles from './MenuList.module.scss';

/**
 *
 *
 * @param props The component props
 */
const MenuList = (props: PropsWithChildren<{}>) => (
    <ul className={styles.menuList}>
        {props.children}
    </ul>
);

MenuList.Item = MenuListItem;

export {
    MenuList as default,
    MenuListItem,
};
