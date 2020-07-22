/**
 * @file The main server entry point.
 * @author Andrey Glotov <andrei.glotoff@gmail.com>
 */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// Node Imports
import path from 'path';

// Imports
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

// App Imports
import apiAuthRoute from './routes/api/auth';
import renderRoute from './routes/render';
import socialAuthRoute from './routes/socialauth';

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/devcircle';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', apiAuthRoute);
app.use('/socialauth', socialAuthRoute);
app.use('/', renderRoute);

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const webpackConfig = require('../../webpack.config')()[0];
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
    }));

    app.use(webpackHotMiddleware(compiler));
}

/**
 * Default error handler.
 *
 * @param err The error object.
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 * @param next Passes control to the next middleware function.
 */
const handleError: express.ErrorRequestHandler = (err, req, res) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
};
app.use(handleError);

// Connect to MongoDB and start the server.
(async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}!`);
        });
    } catch (err) {
        console.log('Database connection error');
    }
})();
