/**
 * @file Header component.
 * @author Andrey Glotov
 */

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '../Button';
import { InboxContainer } from '../InboxContainer';
import { Logo } from '../Logo';
import { MainMenu } from '../MainMenu';
import { NotifierContainer } from '../NotifierContainer';
import { RequestsContainer } from '../RequestsContainer';
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

            <NavLink to="/" className={styles.search}>
                <FontAwesomeIcon
                    className={styles.searchIcon}
                    icon={faSearch}
                    title="Search"
                />
            </NavLink>

            <div className={styles.actions}>
                <RequestsContainer />
                <InboxContainer />
                <NotifierContainer />
            </div>

            <UserMenuContainer className={styles.user} />
        </div>
    </header>
);
