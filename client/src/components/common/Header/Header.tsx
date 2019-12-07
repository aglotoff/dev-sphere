import React, { FunctionComponent } from 'react';

import AccountMenu from '../AccountMenu/AccountMenu';
import Logo from '../Logo/Logo';

import styles from './Header.module.scss';

const Header: FunctionComponent = () => {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                 <Logo />
                 <AccountMenu />
            </div>
        </header>
    );
};

export default Header;
