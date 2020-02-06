import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MobileMenu } from '../MobileMenu';

import { logout } from '../../../store/actions/api';
import { getUser } from '../../../store/reducers/api';

export const MobileMenuContainer: FC = () => {
    const dispatch = useDispatch();

    const user = useSelector(getUser);
    if (user == null) {
        return null;
    }

    const [ firstName ] = user.fullName.split(/\s+/);

    const handleLogout = () => dispatch(logout());

    return (
        <MobileMenu
            userName={firstName}
            onLogout={handleLogout}
        />
    );
};
