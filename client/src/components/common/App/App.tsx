import React, { useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

import Home from '../Home/Home';
import LoggedInRoute from '../LoggedInRoute/LoggedInRoute';
import LoggedOutRoute from '../LoggedOutRoute/LoggedOutRoute';

import { AppState } from '../../../store';
import { getUser } from '../../../store/auth/actions';

const App: React.FC = () => {
    const { loggedIn } = useSelector((state: AppState) => ({
        loggedIn: state.auth.loggedIn,
        user: state.auth.loggedIn,
    }));
    const dispatch = useDispatch();

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
