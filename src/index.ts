/**
 * @file The main server entry point
 * @author Andrey Glotov
 */

import path from 'path';

import express from 'express';
import mongoose from 'mongoose';

import authRoute from './routes/auth';

// Environment variables
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/devcircle';

const app = express();

// REST API endpoints
app.use('/api', express.json());
app.use('/api/auth', authRoute);

// Send the static build files
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(
            __dirname,
            '../client/build/index.html',
        ));
    });
}

// Default error handler
app.use((
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

// Connect to MongoDB and start the server
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
        console.log(`Database connection error: ${err}`);
    }
})();
