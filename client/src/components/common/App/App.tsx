import React, { useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

import LoggedInRoute from '../LoggedInRoute/LoggedInRoute';
import LoggedOutRoute from '../LoggedOutRoute/LoggedOutRoute';

import { AppState } from '../../../store';
import { getUser, refreshToken } from '../../../store/actions/api';

const App: React.FC = () => {
    const dispatch = useDispatch();

    // Try to log in
    useEffect(() => {
        dispatch(refreshToken());
    }, [ dispatch ]);

    const { loggedIn } = useSelector((state: AppState) => ({
        loggedIn: state.api.auth.accessToken != null,
    }));

    useEffect(() => {
        if (loggedIn) {
            dispatch(getUser());
        }
    }, [ loggedIn, dispatch ]);

    return (
        <DocumentTitle title="DevCircle">
            <BrowserRouter>
                <Switch>
                    <LoggedOutRoute path="/login" component={Login} />
                    <LoggedOutRoute path="/register" component={Register} />
                    <LoggedInRoute path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        </DocumentTitle>
    );
};

export default App;
