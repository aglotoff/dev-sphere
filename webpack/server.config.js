// Node Imports
const path = require('path');

// Imports
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

module.exports = (env) => merge(require('./base.config')({
    ...env,
    server: true,
}), {
    name: 'server',
    target: 'node',

    node: {
        __dirname: false,
    },

    externals: [ nodeExternals() ],

    entry: './src/server/index',

    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, '..', 'dist'),
    },
});
