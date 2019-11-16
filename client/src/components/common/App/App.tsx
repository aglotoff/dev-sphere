import React, { useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

import Home from '../Home/Home';
import LoggedInRoute from '../LoggedInRoute/LoggedInRoute';
import LoggedOutRoute from '../LoggedOutRoute/LoggedOutRoute';

import { getUser } from '../../../store/auth/actions';

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [ dispatch ]);

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
