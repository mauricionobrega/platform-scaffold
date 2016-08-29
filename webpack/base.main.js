/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CACHE_MANIFEST_NAME = 'cache-hash-manifest.json'

module.exports = {
    devtool: 'cheap-source-map',
    entry: [
        'react-hot-loader/patch',
        'whatwg-fetch',
        './app/main.jsx',
    ],
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js'
    },
    // Loaders are resolved relative to the file being applied to. Specifying the
    // root option here lets Webpack know they are Node modules - avoiding errors
    resolveLoader: {
        root: path.join(process.cwd(), 'node_modules')
    },
    resolve: {
        alias: {
            react: path.resolve(process.cwd(), 'node_modules', 'react'),
            cacheHashManifest: path.resolve(process.cwd(), 'tmp', CACHE_MANIFEST_NAME)
        },
        extensions: ['', '.js', '.jsx', '.json']
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new CopyPlugin([
            {from: 'static/', to: 'static/'}
        ]),
    ],
    module: {
        loaders: [
            {
                name: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    'babel'
                ],
                cacheDirectory: `${__dirname}/tmp`
            },
            {
                name: 'progressive-sdk-loader',
                test: /node_modules\/progressive-web-sdk\/.*\.jsx?$/,
                loaders: [
                    'babel'
                ],
                cacheDirectory: `${__dirname}/tmp`
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.svg$/,
                loader: 'text'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css', 'sass']),
                include: [
                    /progressive-web-sdk/,
                    /app/
                ]
            },
        ],
    }
}
