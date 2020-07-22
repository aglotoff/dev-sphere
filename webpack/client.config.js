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
            ...(env.production ? [] : [
                // Required to  receive notifications abound bundle rebuilds
                'webpack-hot-middleware/client',
            ]),
            './src/client/index'
        ],
    },

    output: {
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].bundle.js',
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
                'css/[name].[contenthash:8].css' :
                'css/[name].css',
            chunkFilename: env.production ?
                'css/[name].chunk.[contenthash:8].css' :
                'css/[name].chunk.css',
        }),

        ...(env.production ? [] : [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ])
    ],
});
