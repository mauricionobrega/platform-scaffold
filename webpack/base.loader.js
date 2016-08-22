/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')

module.exports = {
    devtool: 'cheap-source-map',
    entry: './app/loader.js',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'loader.min.js'
    },
    resolveLoader: {
        root: path.join(process.cwd(), 'node_modules')
    },
    resolve: {
        alias: {
            cacheHashManifest: path.resolve(process.cwd(), 'tmp', 'cache-hash-manifest.json')
        },
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
                test: /\.json$/,
                loader: 'json'
            },
        ],
    }
}
