// Imports
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const localIdentName = '[local]___[hash:base64:5]';

module.exports = (env) => ({
     mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'inline-source-map',

    output: {
        publicPath: '/',
    },

    resolve: {
        modules: [ 'node_modules' ],
        extensions: [ '.ts', '.tsx', '.js', '.jsx' ],

        // Replace react-dom with a more React-Hot-Loader friendly version.
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },

    optimization: env.production ? {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
        ],
    } : {},

    module: {
        rules: [
            // React Hot Loader requires the code to be passed through Babel,
            // so we use it to parse TypeScript syntax instead of ts-loader.
            {
                test: /\.(j|t)s(x)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        sourceType: 'unambiguous',
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            'react-hot-loader/babel',
                            'react-imported-component/babel',
                            ...(env.server ? [
                                'babel-plugin-dynamic-import-node',
                            ] : []),
                        ],
                    },
                },
            },

            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },

            // All output '.js' files will have any sourcemaps re-processed
            // by source-map-loader
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },

            {
                test: /\.module\.(css|sass|scss)$/i,
                exclude: /node_modules/,
                use: [
                    ...(env.server ? [] : [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: !env.production,
                            },
                        },
                    ]),
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !env.production,
                            importLoaders: 2,
                            modules: {
                                localIdentName,
                            },
                            onlyLocals: !!env.server,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !env.production,
                        }
                    }
                ],
            },

            {
                test: /\.(css|sass|scss)$/i,
                exclude: /\.module\.(css|sass|scss)$/i,
                use: [
                    ...(env.server ? [] : [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: !env.production,
                            },
                        },
                    ]),
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !env.production,
                            importLoaders: 2,
                            modules: false,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !env.production,
                        }
                    }
                ],
            },

            {
                test: /\.(svg|png|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: !env.server,
                            outputPath: 'images',
                        },
                    }
                ]
            },

            {
                test: /\.(woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: !env.server,
                            outputPath: 'fonts',
                        },
                    }
                ]
            },
        ],
    },

    plugins: [
        // This plugin is needed to typecheck our code, because Babel won't do
        // it for us.
        new ForkTsCheckerWebpackPlugin(),
    ],
});
