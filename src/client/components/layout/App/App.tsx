/**
 * @file Application main component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import DocumentTitle from 'react-document-title';
import { hot } from 'react-hot-loader';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { Switch } from 'react-router-dom';

// Page Imports
import { About } from '../../pages/About';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { NotFound } from '../../pages/NotFound';
import { Register } from '../../pages/Register';

// UI Imports
import { LoggedInRoute } from '../LoggedInRoute';
import { LoggedOutRoute } from '../LoggedOutRoute';
import { SkipLink } from '../SkipLink';

// Hooks Imports
import { useAutomaticLogin, useFocusTrap } from './hooks';

// Font Imports
import '../../../assets/fonts/Metropolis-Bold.woff';
import '../../../assets/fonts/Metropolis-Bold.woff2';
import '../../../assets/fonts/Metropolis-Medium.woff';
import '../../../assets/fonts/Metropolis-Medium.woff2';
import '../../../assets/fonts/Metropolis-Regular.woff';
import '../../../assets/fonts/Metropolis-Regular.woff2';
import '../../../assets/fonts/Metropolis-SemiBold.woff';
import '../../../assets/fonts/Metropolis-SemiBold.woff2';
import '../../../assets/fonts/OpenSans-Bold.woff';
import '../../../assets/fonts/OpenSans-Bold.woff2';
import '../../../assets/fonts/OpenSans-BoldItalic.woff';
import '../../../assets/fonts/OpenSans-BoldItalic.woff2';
import '../../../assets/fonts/OpenSans-Italic.woff';
import '../../../assets/fonts/OpenSans-Italic.woff2';
import '../../../assets/fonts/OpenSans-Regular.woff';
import '../../../assets/fonts/OpenSans-Regular.woff2';

// Global CSS Imports
import '../../../assets/styles/main.scss';

const routes: RouteConfig[] = [
    {
        path: '/about',
        exact: true,
        component: About,
    },
    {
        path: '/login',
        exact: true,
        render: () => <LoggedOutRoute component={Login} />,
    },
    {
        path: '/register',
        exact: true,
        render: () => <LoggedOutRoute component={Register} />,
    },
    {
        path: '/',
        exact: true,
        render: () => <LoggedInRoute component={Home} />,
    },
    {
        component: NotFound,
    },
];

/**
 * Main application component.
 *
 * @returns The element to render.
 */
const ColdApp: FC = () => {
    useFocusTrap('focus-utility');
    useAutomaticLogin();

    // const loginChecked = useAutomaticLogin();
    // Prevent the login page from showing up before login is checked
    // if (!loginChecked) {
    //     return null;
    // }

    return (
        <DocumentTitle title="DevSphere">
            <>
                <SkipLink />

                <Switch>
                    {renderRoutes(routes)}
                </Switch>
            </>
        </DocumentTitle>
    );
};

export const App = hot(module)(ColdApp);
