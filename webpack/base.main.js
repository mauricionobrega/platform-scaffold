/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    devtool: 'cheap-source-map',
    entry: [
        'whatwg-fetch',
        './app/main.jsx',
    ],
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            react: path.resolve(process.cwd(), 'node_modules', 'react'),
        },
        extensions: ['', '.js', '.jsx']
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
