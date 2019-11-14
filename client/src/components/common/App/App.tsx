import React from 'react';
import DocumentTitle from 'react-document-title';
import { BrowserRouter, Switch } from 'react-router-dom';

import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

import Home from '../Home/Home';
import LoggedInRoute from '../LoggedInRoute/LoggedInRoute';
import LoggedOutRoute from '../LoggedOutRoute/LoggedOutRoute';

const App: React.FC = () => {
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
