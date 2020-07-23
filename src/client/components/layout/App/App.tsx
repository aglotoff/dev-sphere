/**
 * @file Application main component.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Imports
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
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

    const { loggedIn, user } = useAutomaticLogin();

    return (
        <>
            <Helmet
                defaultTitle="DevSphere - Social Network for Developers"
                titleTemplate="%s - DevSphere"
            >
                <html lang="en" />
                <meta charSet="utf-8" />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Helmet>

            <SkipLink />

            {(loggedIn && (user == null)) ? (
                <div>Wait...</div>
            ) : (
                <Switch>
                    {renderRoutes(routes)}
                </Switch>
            )}
        </>
    );
};

export const App = hot(module)(ColdApp);
