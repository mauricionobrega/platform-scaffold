/* eslint-disable import/no-commonjs */
/* eslint-env node */

const webpack = require('webpack')
const path = require('path')
const baseCommon = require('./base.common')
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
    // Loaders are resolved relative to the file being applied to. Specifying the
    // root option here lets Webpack know they are Node modules - avoiding errors
    resolveLoader: {
        root: path.join(process.cwd(), 'node_modules')
    },
    resolve: {
        alias: {
            react: path.resolve(process.cwd(), 'node_modules', 'react'),
            components: path.resolve(process.cwd(), 'app', 'components')
        },
        extensions: ['', '.js', '.jsx', '.json']
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new CopyPlugin([
            {from: 'app/static/', to: 'static/'}
        ]),
        new webpack.DefinePlugin({
            PROJECT_SLUG: JSON.stringify(require('../package.json').projectSlug), // eslint-disable-line import/no-extraneous-dependencies
            AJS_SLUG: JSON.stringify(require('../package.json').aJSSlug) // eslint-disable-line import/no-extraneous-dependencies
        })
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
            }
        ],
    },
    postcss: baseCommon.postcss
}
