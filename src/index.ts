
import path = require('path');

import express = require('express');
import mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/devcircle';

if (true) {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(
            __dirname,
            '..',
            'client',
            'build',
            'index.html',
        ));
    });
}

(async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
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
