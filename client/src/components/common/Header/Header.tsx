/**
 * @file Header component.
 * @author Andrey Glotov
 */

import React, { FC } from 'react';

import Button from '../Button/Button';
import HeaderMessages from '../HeaderMessages/HeaderMessages';
import HeaderNotifications from '../HeaderNotifications/HeaderNotifications';
import HeaderRequests from '../HeaderRequests/HeaderRequests';
import Logo from '../Logo/Logo';
import MainMenu from '../MainMenu/MainMenu';
import UserMenuContainer from '../UserMenuContainer/UserMenuContainer';

import styles from './Header.module.scss';

/**
 * Application header.
 */
const Header: FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Logo className={styles.logo} />

                <MainMenu className={styles.menu}>
                    <MainMenu.Item href="/">
                        Home
                    </MainMenu.Item>
                    <MainMenu.Item href="/discussion">
                        Discussion
                    </MainMenu.Item>
                    <MainMenu.Item href="/weather">
                        Weather
                    </MainMenu.Item>
                    <MainMenu.Item href="/blog">
                        Blog
                    </MainMenu.Item>
                </MainMenu>

                <Button className={styles.newEventBtn}>Add New Event</Button>

                <div className={styles.actions}>
                    <HeaderRequests />
                    <HeaderMessages />
                    <HeaderNotifications />
                </div>

                <UserMenuContainer className={styles.user} />
            </div>
        </header>
    );
};

export default Header;
