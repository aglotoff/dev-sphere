/**
 * @file User dropdown menu container component.
 * @author Andrey Glotov
 */

import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../../store/actions/api';
import { getUser } from '../../../store/reducers/api';

import UserMenu, { IUserMenuProps } from '../UserMenu/UserMenu';

/**
 * Props for the user menu container component.
 */
type IUserMenuContainerProps = Omit<
    IUserMenuProps,
    'userName' | 'onLogout' | 'credits' | 'picture'
>;

/**
 * Container component for the user dropdown menu.
 */
const UserMenuContainer: FC<IUserMenuContainerProps> = (props) => {
    const dispatch = useDispatch();

    const user = useSelector(getUser);
    if (user == null) {
        return null;
    }

    const [ firstName ] = user.fullName.split(/\s+/);

    const handleLogout = () => dispatch(logout());

    return (
        <UserMenu
            {...props}
            credits={100}
            userName={firstName}
            onLogout={handleLogout}
        />
    );
};

export default UserMenuContainer;
