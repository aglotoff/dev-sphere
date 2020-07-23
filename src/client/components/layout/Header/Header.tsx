/**
 * @file Header component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';
import Media from 'react-media';

// UI Imports
import { Button } from '../../common/Button';
import { Logo } from '../../common/Logo';
import { FriendsNotifierContainer } from '../FriendsNotifier';
import { HeaderButton } from '../HeaderButton';
import { InboxNotifierContainer } from '../InboxNotifier';
import { MainMenu } from '../MainMenu';
import { MiscNotifierContainer } from '../MiscNotifier';
import { MobileMenuContainer } from '../MobileMenu';
import { UserMenuContainer } from '../UserMenu';

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
                    <Logo className={styles.logo} responsive showTitle />

                    {matches && <MainMenu className={styles.menu} />}

                    <Button className={styles.newEventBtn}>
                        Add New Event
                    </Button>

                    <HeaderButton
                        className={styles.search}
                        href="/search"
                        icon={faSearch}
                        title="Search"
                    />

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
    <Media query="(min-width: 60em)">
        {(matches) => (
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Logo className={styles.logo} responsive showTitle />

                    {matches && <MainMenu className={styles.menu} />}

                    <Button className={styles.loginButton} href="/login">
                        Login
                    </Button>

                    {!matches && (
                        <MobileMenuContainer className={styles.mobileMenu} />
                    )}
                </div>
            </header>
        )}
    </Media>
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
export const Header: FC<IHeaderProps> = ({ isLoggedIn }) => (isLoggedIn ? (
    <HeaderLoggedInView />
) : (
    <HeaderLoggedOutView />
));
