/**
 * @file Header component.
 * @author Andrey Glotov
 */

 // Imports
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { FC } from 'react';
import Media from 'react-media';
import { NavLink } from 'react-router-dom';

// UI Imports
import { Button } from '../Button';
import { FriendsNotifierContainer } from '../FriendsNotifierContainer';
import { InboxNotifierContainer } from '../InboxNotifierContainer';
import { Logo } from '../Logo';
import { MainMenu } from '../MainMenu';
import { MiscNotifierContainer } from '../MiscNotifierContainer';
import { MobileMenuContainer } from '../MobileMenuContainer';
import { UserMenuContainer } from '../UserMenuContainer';

// CSS Imports
import styles from './Header.module.scss';

/**
 * Application header.
 *
 * @returns The element to render.
 */
export const Header: FC = () => (
    <Media query="(min-width: 60em)">
        {(matches) => (
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Logo className={styles.logo} hideTextOnMobile />

                    {matches && <MainMenu className={styles.menu} />}

                    <Button className={styles.newEventBtn}>
                        Add New Event
                    </Button>

                    <NavLink
                        className={classNames(styles.button, styles.search)}
                        to="/"
                    >
                        <FontAwesomeIcon
                            className={styles.buttonIcon}
                            icon={faSearch}
                            title="Search"
                        />
                    </NavLink>

                    <div className={styles.notifiers}>
                        <FriendsNotifierContainer />
                        <InboxNotifierContainer />
                        <MiscNotifierContainer />
                    </div>

                    {matches ? (
                        <UserMenuContainer className={styles.userMenu} />
                    ) : (
                        <MobileMenuContainer className={styles.mobileMenu} />
                    )}
                </div>
            </header>
        )}
    </Media>
);
