/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const MainCSS = new ExtractTextPlugin('[name].css')
const ThemeCSS = new ExtractTextPlugin('themes.css')

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
            $: 'jquery'
        }),
        MainCSS,
        ThemeCSS,
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
                loader: MainCSS.extract(['css', 'sass']),
                exclude: /themes/
            },
            {
                test: /\.scss$/,
                loader: ThemeCSS.extract(['css', 'sass']),
                include: /themes/
            },
        ],
    }
}
