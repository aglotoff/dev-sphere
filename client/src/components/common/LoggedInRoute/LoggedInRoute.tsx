/**
 * @file Logged In Route component.
 * @author Andrey Glotov
 */

// Imports
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
    Redirect,
    Route,
    RouteComponentProps,
    RouteProps,
} from 'react-router-dom';

// App Imports
import { getIsLoggedOut } from '../../../store/reducers/api';

/**
 * Props for the Logged In Route component.
 */
export interface ILoggedInRouteProps extends RouteProps {
    /** The component to render when the location matches. */
    component: React.ComponentType<RouteComponentProps>;
}

/**
 * Route only for logged in users.
 *
 * Returns a <Route /> if the user is logged in, otherwise redirects to the
 * login page.
 *
 * @param props The component props.
 * @return The element to render.
 */
export const LoggedInRoute: FC<ILoggedInRouteProps> = ({
    component: Component,
    ...restProps
}) => {
    const isLoggedOut = useSelector(getIsLoggedOut);
    if (isLoggedOut) {
        return <Redirect to="/login" />;
    }

    return (
        <Route
            {...restProps}
            render={(injectedProps) => <Component {...injectedProps} />}
        />
    );
};
