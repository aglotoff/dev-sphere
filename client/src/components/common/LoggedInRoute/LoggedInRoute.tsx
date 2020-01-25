/**
 * @file Route only for logged in users
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

import { getIsLoggedOut } from '../../../store/reducers/api';

/**
 * Props for the logged in route component.
 */
export interface ILoggedInRouteProps extends RouteProps {
    /** The React component to render when the location matches */
    component: React.ComponentType<RouteComponentProps>;
}

/**
 * Route only for logged in users.
 *
 * Returns a <Route /> if the user is logged in, otherwise redirects to the
 * login page.
 *
 * @param props The component props
 */
export const LoggedInRoute = (props: ILoggedInRouteProps) => {
    const { component: Component, ...rest } = props;

    const isLoggedOut = useSelector(getIsLoggedOut);
    if (isLoggedOut) {
        return <Redirect to="/login" />;
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
