/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const baseCommon = require('./base.common')

module.exports = {
    devtool: 'cheap-source-map',
    entry: './app/loader.js',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'loader.min.js'
    },
    // Loaders are resolved relative to the file being applied to. Specifying the
    // root option here lets Webpack know they are Node modules - avoiding errors
    resolveLoader: {
        root: path.join(process.cwd(), 'node_modules')
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=es2015',
                cacheDirectory: `${__dirname}/tmp`
            },
            {
                test: /\.css?$/,
                exclude: /node_modules/,
                loader: 'postcss',
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ],
    },
    postcss: baseCommon.postcss
}
