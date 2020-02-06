import {
    faBars,
    faSignOutAlt,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, {
    FC,
    MouseEventHandler,
    PropsWithChildren,
    useState,
} from 'react';
import { NavLink } from 'react-router-dom';

import { Avatar } from '../Avatar';

import styles from './MobileMenu.module.scss';

export interface IMobileMenuItemProps {
    icon?: IconDefinition;
    avatar?: string;
    href?: string;
    onClick?: MouseEventHandler;
}

export const MobileMenuItem: FC<PropsWithChildren<IMobileMenuItemProps>> = ({
    avatar,
    children,
    href,
    icon,
    onClick,
}) => {
    const content = (
        <>
            {avatar && <Avatar picture={avatar} className={styles.avatar} />}
            {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
            {children}
        </>
    );

    let action;
    if (href) {
        action = (
            <NavLink className={styles.action} to={href}>
                {content}
            </NavLink>
        );
    } else {
        action = (
            <button className={styles.action} onClick={onClick}>
                {content}
            </button>
        );
    }

    return (
        <li className={styles.item}>
            {action}
        </li>
    );
};

export interface IMobileMenuProps {
    userName: string;
    userAvatar?: string;
    onLogout: () => void;
}

export const MobileMenu: FC<IMobileMenuProps> = ({
    userName,
    userAvatar,
    onLogout,
}) => {
    const [ expanded, setExpanded ] = useState(false);

    const listClass = classNames(
        styles.list,
        expanded && styles.list_expanded,
    );

    const handleToggleClick = () => {
        setExpanded(!expanded);
    };

    return (
        <nav>
            <div className={styles.bar}>
                <button
                    className={styles.toggle}
                    aria-haspopup
                    aria-controls="mobile-menu"
                    aria-expanded={expanded}
                    onClick={handleToggleClick}
                >
                    <FontAwesomeIcon icon={faBars} title="Toggle menu" />
                </button>
            </div>

            <ul className={listClass} id="mobile-menu">
                <MobileMenuItem href="/">
                    Home
                </MobileMenuItem>
                <MobileMenuItem href="/discussion">
                    Discussion
                </MobileMenuItem>
                <MobileMenuItem href="/weather">
                    Weather
                </MobileMenuItem>
                <MobileMenuItem href="/blog">
                    Blog
                </MobileMenuItem>
                <MobileMenuItem href="/profile" avatar={userAvatar}>
                    {userName}
                </MobileMenuItem>
                <MobileMenuItem icon={faSignOutAlt} onClick={onLogout}>
                    Logout
                </MobileMenuItem>
            </ul>
        </nav>
    );
};
