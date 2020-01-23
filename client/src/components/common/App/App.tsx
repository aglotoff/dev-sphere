import React, { useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

import LoggedInRoute from '../LoggedInRoute/LoggedInRoute';
import LoggedOutRoute from '../LoggedOutRoute/LoggedOutRoute';

import { getUser, refreshToken } from '../../../store/actions/api';
import { getIsLoggedIn } from '../../../store/reducers/api';

const App: React.FC = () => {
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

    return (
        <DocumentTitle title="DevSphere">
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
