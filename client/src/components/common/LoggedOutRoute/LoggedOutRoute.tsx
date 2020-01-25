/**
 * @file Route only for logged out users
 * @author Andrey Glotov
 */

import React from 'react';
import { useSelector } from 'react-redux';
import {
    Redirect,
    Route,
    RouteComponentProps,
    RouteProps,
} from 'react-router-dom';

import { getIsLoggedIn } from '../../../store/reducers/api';

/**
 * Props for the logged out route component.
 */
export interface ILoggedOutRouteProps extends RouteProps {
    /** The React component to render when the location matches */
    component: React.ComponentType<RouteComponentProps>;
}

/**
 * Route only for logged out users.
 *
 * Returns a <Route /> if the user is logged out, otherwise redirects to the
 * home page.
 *
 * @param props The component props
 */
export const LoggedOutRoute = (props: ILoggedOutRouteProps) => {
    const { component: Component, ...rest } = props;

    const isLoggedIn = useSelector(getIsLoggedIn);
    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return(
        <Route
            {...rest}
            render={(injectedProps) => (
                <Component {...injectedProps} />
            )}
        />
    );
};
