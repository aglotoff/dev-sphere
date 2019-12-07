import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { logout } from '../../../store/auth/actions';

import Dropdown from '../Dropdown/Dropdown';
import MenuList from '../MenuList/MenuList';

import styles from './AccountMenu.module.scss';

const AccountMenu: FunctionComponent = () => {
    const dispatch = useDispatch();

    const user = useSelector((state: AppState) => state.auth.user);
    if (user == null) {
        return null;
    }

    const [ firstName ] = user.fullName.split(/\s+/);

    const handleLogoutClick = () => dispatch(logout());

    return (
        <Dropdown
            id="account-menu"
            renderToggle={() => (
                <span className={styles.toggle}>
                    Hi! {firstName}
                    <i className={styles.arrow} aria-hidden="true">
                        <FontAwesomeIcon icon={faAngleDown} />
                    </i>
                </span>
            )}
        >
            <MenuList>
                <MenuList.Item href="/">
                    Profile
                </MenuList.Item>
                <MenuList.Item href="/messages">
                    Messages
                </MenuList.Item>
                <MenuList.Item href="/booked-events">
                    Booked Events
                </MenuList.Item>
                <MenuList.Item href="/credits">
                    Credits
                </MenuList.Item>
                <MenuList.Item href="/settings">
                    Settings
                </MenuList.Item>
                <MenuList.Item onClick={handleLogoutClick}>
                    Logout
                </MenuList.Item >
            </MenuList>
        </Dropdown>
    );
};

export default AccountMenu;
