/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const webpack = require('webpack')
const baseCommon = require('./base.common')

module.exports = {
    devtool: 'cheap-source-map',
    entry: './app/loader.js',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'loader.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: `${__dirname}/tmp`
                    }
                }
            },
            {
                test: /\.css?$/,
                exclude: /node_modules/,
                use: 'postcss-loader',
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: baseCommon.postcss
            }
        })
    ]
}
