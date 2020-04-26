// Imports
import React, { FC, useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Page Imports
import { About } from '../../pages/About';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';

// UI Imports
import { LoggedInRoute } from '../LoggedInRoute';
import { LoggedOutRoute } from '../LoggedOutRoute';
import { SkipLink } from '../SkipLink';

// App Imports
import { getUser, refreshToken } from '../../../store/actions/api';
import { getIsLoggedIn } from '../../../store/reducers/api';

// Hooks Imports
import { useFocusTrap } from './hooks';

export const App: FC = () => {
    const dispatch = useDispatch();

    // Try to log in
    useEffect(() => {
        dispatch(refreshToken());
    }, [ dispatch ]);

    const loggedIn = useSelector(getIsLoggedIn);

    useEffect(() => {
        if (loggedIn) {
            dispatch(getUser());
        }
    }, [ loggedIn, dispatch ]);

    useFocusTrap('focus-utility');

    return (
        <DocumentTitle title="DevSphere">
            <BrowserRouter>
                <SkipLink />

                <Switch>
                    <Route path="/about" component={About} />

                    <LoggedOutRoute path="/login" component={Login} />
                    <LoggedOutRoute path="/register" component={Register} />
                    <LoggedInRoute path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        </DocumentTitle>
    );
};
