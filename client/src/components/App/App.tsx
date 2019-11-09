import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';

import LoggedInRoute from '../LoggedInRoute/LoggedInRoute';
import LoggedOutRoute from '../LoggedOutRoute/LoggedOutRoute';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <LoggedOutRoute path="/login" component={Login} />
                <LoggedOutRoute path="/register" component={Register} />
                <LoggedInRoute path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
