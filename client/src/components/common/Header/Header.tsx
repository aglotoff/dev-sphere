/**
 * @file Header component.
 * @author Andrey Glotov
 */

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import Media from 'react-media';
import { NavLink } from 'react-router-dom';

import { Button } from '../Button';
import { FriendsNotifierContainer } from '../FriendsNotifierContainer';
import { InboxNotifierContainer } from '../InboxNotifierContainer';
import { Logo } from '../Logo';
import { MainMenu } from '../MainMenu';
import { MiscNotifierContainer } from '../MiscNotifierContainer';
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

            <Button className={styles.newEventBtn}>
                Add New Event
            </Button>

            <NavLink to="/" className={styles.search}>
                <FontAwesomeIcon
                    className={styles.searchIcon}
                    icon={faSearch}
                    title="Search"
                />
            </NavLink>

            <div className={styles.actions}>
                <FriendsNotifierContainer />
                <InboxNotifierContainer />
                <MiscNotifierContainer />
            </div>

            <Media query="(min-width: 60em)">
                {(matches) => matches && (
                    <UserMenuContainer className={styles.user} />
                )}
            </Media>
        </div>
    </header>
);
