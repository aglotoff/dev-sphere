import React from 'react';
import { connect } from 'react-redux';
import {
    Redirect,
    Route,
    RouteComponentProps,
    RouteProps,
} from 'react-router-dom';

import { AppState } from '../../store';

export interface ILoggedOutRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps>;
    isLoggedIn: boolean;
}

const LoggedOutRoute = (props: ILoggedOutRouteProps) => {
    const { component: Component, isLoggedIn, ...rest } = props;

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

const mapStateToProps = (state: AppState) => ({
    isLoggedIn: state.api.accessToken !== null,
});

export default connect(mapStateToProps)(LoggedOutRoute);
