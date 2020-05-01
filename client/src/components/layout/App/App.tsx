/**
 * @file Application main component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import DocumentTitle from 'react-document-title';
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

// Hooks Imports
import { useAutomaticLogin, useFocusTrap } from './hooks';

/**
 * Main application component.
 *
 * @returns The element to render.
 */
export const App: FC = () => {
    useFocusTrap('focus-utility');

    const loginChecked = useAutomaticLogin();

    // Prevent the login page from showing up before login is checked
    if (!loginChecked) {
        return null;
    }

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
