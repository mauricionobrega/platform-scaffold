/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const CACHE_MANIFEST_NAME = 'loader-cache-hash-manifest.json'

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
        alias: {
            cacheHashManifest: path.resolve(process.cwd(), 'tmp', CACHE_MANIFEST_NAME)
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
            }
        ],
    }
}
