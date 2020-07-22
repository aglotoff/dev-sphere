// Node Imports
import path from 'path';

// Imports
import { dom } from '@fortawesome/fontawesome-svg-core';
import { RequestHandler } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
    ImportedStream,
    printDrainHydrateMarks,
} from 'react-imported-component';
import { createLoadableStream } from 'react-imported-component/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { discoverProjectStyles, getUsedStyles } from 'used-styles';

import '../../client/imported';

import { App } from '../../client/components/layout/App';
import configureStore from '../../client/store/configureStore';

// Generate lookup table on server start
const stylesLookup = discoverProjectStyles(path.join(__dirname, 'public'));

export const render: RequestHandler = async (req, res, next) => {
    try {
        await stylesLookup;

        const store = configureStore();

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
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Hello)))!</title>

        <style>${dom.css()}</style>
        ${links.join('\n        ')}

        ${printDrainHydrateMarks(stream)}
    </head>
    <body>
        <div id="root">${html}</div>

        <script>window.__PRELOADED_STATE__ = ${preloadedState};</script>
        <script src="/js/index.bundle.js"></script>
    </body>
</html>`);
    } catch (err) {
        next(err);
    }
};
