// Node Imports
const path = require('path');

// Imports
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

module.exports = (env) => merge(require('./base.config')({
    ...env,
    server: false,
}), {
    name: 'client',
    target: 'web',

    optimization: env.production ? {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
        ],
    } : {},

    entry: {
        index: [
            './src/client/index'
        ],
    },

    output: {
        filename: 'assets/js/[name].bundle.js',
        chunkFilename: 'assets/js/[name].bundle.js',
        path: path.resolve(__dirname, '..', 'dist', 'public'),
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './public',
                },
            ],
        }),

        new MiniCssExtractPlugin({
            filename: env.production ?
                'assets/css/[name].[contenthash:8].css' :
                'assets/css/[name].css',
            chunkFilename: env.production ?
                'assets/css/[name].chunk.[contenthash:8].css' :
                'assets/css/[name].chunk.css',
        }),

        ...(env.production ? [] : [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ])
    ],

    // In development mode, serve the client code using webpack-dev-server
    devServer: {
        contentBase: path.join(__dirname, '..', 'dist', 'public'),
        compress: true,
        hot: true,
        port: 3000,

        // Proxy all requests to the backend except those for the assets
        proxy: [{
            context: [ '**', '!/assets/**' ],
            target: 'http://localhost:4000',
            changeOrigin: true,
        }],
    },
});
