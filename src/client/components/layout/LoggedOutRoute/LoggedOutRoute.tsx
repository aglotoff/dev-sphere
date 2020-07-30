/**
 * @file Logged Out Route component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

// App Imports
import { getIsLoggedIn } from '../../../store/selectors/auth';

/**
 * Props for the Logged Out Route component.
 */
export interface ILoggedOutRouteProps {
    /** The component to render when the location matches. */
    component: React.ComponentType;
}

/**
 * Route only for logged out users.
 *
 * Returns a <Route /> if the user is logged out, otherwise redirects to the
 * home page.
 *
 * @param props The component props.
 * @returns The element to render.
 */
export const LoggedOutRoute: FC<ILoggedOutRouteProps> = ({
    component: Component,
}) => {
    const isLoggedIn = useSelector(getIsLoggedIn);
    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <Component />
    );
};
