/**
 * @file User Menu container component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI Imports
import { UserMenu } from './UserMenu';

// App Imports
import { logout } from '../../../store/actions/api';
import { getUser } from '../../../store/reducers/api';

/**
 * Props for the User Menu container component.
 */
interface IUserMenuContainerProps {
    /** Additional class name. */
    className?: string;
}

/**
 * Container component for the User Menu.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const UserMenuContainer: FC<IUserMenuContainerProps> = ({
    className,
}) => {
    const dispatch = useDispatch();

    const user = useSelector(getUser);
    if (user == null) {
        return null;
    }

    const [ firstName ] = user.fullName.split(/\s+/);

    const credits = 100;

    const handleLogout = () => dispatch(logout());

    return (
        <UserMenu
            className={className}
            credits={credits}
            firstName={firstName}
            onLogout={handleLogout}
        />
    );
};
