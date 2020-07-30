/**
 * @file Mobile Menu container component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI Imports
import { MobileMenu } from './MobileMenu';

// App Imports
import { logout } from '../../../store/actions/auth';
import { getCurrentUser } from '../../../store/selectors/user';

/**
 * Props for the Mobile Menu container component.
 */
export interface MobileMenuContainerProps {
    /** Additional class name. */
    className?: string;
}

/**
 * Container component for the Mobile Menu.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const MobileMenuContainer: FC<MobileMenuContainerProps> = ({
    className,
}) => {
    const dispatch = useDispatch();

    const user = useSelector(getCurrentUser);
    if (user == null) {
        return (
            <MobileMenu className={className} />
        );
    }

    const [ firstName ] = user.fullName.split(/\s+/);

    const handleLogout = () => dispatch(logout());

    return (
        <MobileMenu
            className={className}
            onLogout={handleLogout}
            userName={firstName}
        />
    );
};
