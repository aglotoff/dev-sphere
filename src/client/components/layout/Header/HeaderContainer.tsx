/**
 * @file Header container component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

// UI Imports
import { Header } from './Header';

// App Imports
import { getIsLoggedIn } from '../../../store/reducers/api';

/**
 * Container component for the Header.
 *
 * @returns The element to render.
 */
export const HeaderContainer: FC = () => {
    const isLoggedIn = useSelector(getIsLoggedIn);

    return (
        <Header isLoggedIn={isLoggedIn} />
    );
};
