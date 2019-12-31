import React, { MouseEvent, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './MenuList.module.scss';

export interface IMenuListItemProps {
    href?: string;
    onClick?: (e: MouseEvent) => void;
}

const MenuListItem = (props: PropsWithChildren<IMenuListItemProps>) => {
    const { children, href, onClick } = props;

    if (href) {
        return (
            <li>
                <NavLink
                    to={href}
                    className={styles.link}
                    activeClassName={styles.link_active}
                >
                    {children}
                </NavLink>
            </li>
        );
    } else {
        return (
            <li>
                <button onClick={onClick} className={styles.link}>
                    {children}
                </button>
            </li>
        );
    }
};

export default MenuListItem;
