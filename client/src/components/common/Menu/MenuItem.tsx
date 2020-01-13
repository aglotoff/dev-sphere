import React, { MouseEvent, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Menu.module.scss';

export interface IMenuItemProps {
    href?: string;
    onClick?: (e: MouseEvent) => void;
}

const MenuItem = (props: PropsWithChildren<IMenuItemProps>) => {
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

export default MenuItem;
