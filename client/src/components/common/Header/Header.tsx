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
 * Header view for logged in users.
 *
 * @returns The element to render.
 */
export const HeaderLoggedInView: FC = () => (
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

/**
 * Header view for the logged out users.
 *
 * @returns The element to render.
 */
export const HeaderLoggedOutView: FC = () => (
    <header className={styles.header}>
        <div className={styles.inner}>
            <Logo className={styles.logo} hideTextOnMobile />

            <Button className={styles.loginButton} href="/login">
                Login
            </Button>
        </div>
    </header>
);

/**
 * Props for the Header component.
 */
export interface IHeaderProps {
    /** Is the user logged in? */
    isLoggedIn: boolean;
}

/**
 * Main application header displayed on all pages except Login and Register.
 *
 * Renders different view depending on whether or not the user is currently
 * logged in.
 *
 * @returns The element to render.
 */
export const Header: FC<IHeaderProps> = ({ isLoggedIn }) => isLoggedIn ? (
    <HeaderLoggedInView />
) : (
    <HeaderLoggedOutView />
);
