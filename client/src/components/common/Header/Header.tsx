/**
 * @file Header component.
 * @author Andrey Glotov
 */

import React, { FC } from 'react';

import { Button } from '../Button';
import { HeaderMessages } from '../HeaderMessages';
import { HeaderNotifications } from '../HeaderNotifications';
import { HeaderRequests } from '../HeaderRequests';
import { Logo } from '../Logo';
import { MainMenu } from '../MainMenu';
import { UserMenuContainer } from '../UserMenuContainer';

import styles from './Header.module.scss';

/**
 * Application header.
 */
export const Header: FC = () => (
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
