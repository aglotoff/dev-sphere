/**
 * @file Server side rendering controller.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

// Node Imports
import path from 'path';

// Imports
import { dom } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import { Request, RequestHandler, Response } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import {
    ImportedStream,
    printDrainHydrateMarks,
} from 'react-imported-component';
import { createLoadableStream } from 'react-imported-component/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { discoverProjectStyles, getUsedStyles } from 'used-styles';

// App Imports
import '../../client/imported';
import { App } from '../../client/components/layout/App';
import { configureStore } from '../../client/store';
import { setAccessToken } from '../../client/store/actions/auth';
import { setUser } from '../../client/store/actions/user';

// API server name
const SERVER_NAME = process.env.SERVER_NAME || 'http://localhost:4000';

// Generate style lookup table on server start
const stylesLookup = discoverProjectStyles(path.join(__dirname, 'public'));

/**
 * Create initial Redux store for server-side rendering.
 *
 * Capture the refresh token cookie, get a new access token for the current
 * user and use it to fetch data.
 *
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 *
 * @returns A promise which resolves to the initial Redux store.
 */
const createStore = async (req: Request, res: Response) => {
    const store = configureStore();

    if (!req.cookies.refreshtoken) {
        return store;
    }

    const refreshToken = req.cookies.refreshtoken as string;

    try {
        let response = await axios({
            url: `${SERVER_NAME}/api/auth/refresh_token`,
            method: 'POST',
            headers: {
                Cookie: `refreshtoken=${refreshToken}`,
            },
            withCredentials: true,
        });

        let responseBody = response.data;
        if (!responseBody.success) {
            return store;
        }

        const accessToken = responseBody.data.accessToken as string;
        store.dispatch(setAccessToken(accessToken));

        // Set new refresh token cookie
        const { headers } = response;
        if (('set-cookie' in headers) && (headers['set-cookie'].length > 0)) {
            const [ cookie ] = headers['set-cookie'][0].split(';');
            const [ , newRefreshToken ] = cookie.split('=');

            res.cookie('refreshtoken', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });
        }

        response = await axios({
            url: `${SERVER_NAME}/api/auth/user`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        responseBody = response.data;
        if (responseBody.success) {
            store.dispatch(setUser(responseBody.data));
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
    }

    return store;
};

export const render: RequestHandler = async (
    req,
    res,
    next,
) => {
    try {
        await stylesLookup;

        const store = await createStore(req, res);

        const stream = createLoadableStream();
        const context: StaticRouterContext = {};

        const html = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <ImportedStream stream={stream}>
                        <App />
                    </ImportedStream>
                </StaticRouter>
            </Provider>,
        );

        const helmet = Helmet.renderStatic();

        const usedStyles = getUsedStyles(html, stylesLookup);
        const links = usedStyles.map((fileName) => {
            const href = fileName.replace(/\\/g, '/');
            return `<link rel="stylesheet" href="/${href}" />`;
        });

        if (context.url) {
            res.redirect(301, context.url);
            return;
        }

        if (context.statusCode) {
            res.status(404);
        }

        const preloadedState = JSON.stringify(store.getState()).replace(
            /</g,
            '\\u003c',
        );

        res.setHeader('Content-Type', 'text/html');
        res.send(`<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
    <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}

        <style>${dom.css()}</style>
        ${links.join('')}

        ${printDrainHydrateMarks(stream)}
    </head>
    <body>
        <div id="root">${html}</div>

        <script>window.__PRELOADED_STATE__ = ${preloadedState};</script>
        <script src="/assets/js/index.bundle.js"></script>
    </body>
</html>`);
    } catch (e) {
        next(e);
    }
};
