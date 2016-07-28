/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'cheap-source-map',
    entry: [
        './app/main.jsx',
    ],
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js'
    },
    externals: {
        jquery: 'jQuery'
    },
    resolve: {
        alias: {
            react: path.resolve(process.cwd(), 'node_modules', 'react'),
        },
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            $: 'jquery',
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new ExtractTextPlugin('[name].css'),
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
                exclude: /node_modules/,
            },
        ],
    }
}
