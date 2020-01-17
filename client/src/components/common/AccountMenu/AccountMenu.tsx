import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../../store/actions/api';
import { getUser } from '../../../store/reducers/api';

import Dropdown from '../Dropdown/Dropdown';
import Menu from '../Menu/Menu';

import styles from './AccountMenu.module.scss';

const AccountMenu: FunctionComponent = () => {
    const dispatch = useDispatch();

    const user = useSelector(getUser);
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
            <Menu>
                <Menu.Item href="/">
                    Profile
                </Menu.Item>
                <Menu.Item href="/messages">
                    Messages
                </Menu.Item>
                <Menu.Item href="/booked-events">
                    Booked Events
                </Menu.Item>
                <Menu.Item href="/credits">
                    Credits
                </Menu.Item>
                <Menu.Item href="/settings">
                    Settings
                </Menu.Item>
                <Menu.Item onClick={handleLogoutClick}>
                    Logout
                </Menu.Item >
            </Menu>
        </Dropdown>
    );
};

export default AccountMenu;
