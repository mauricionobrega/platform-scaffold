/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')

module.exports = {
    devtool: 'cheap-source-map',
    entry: './app/loader.js',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'loader.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=es2015',
                cacheDirectory: `${__dirname}/tmp`
            },
        ],
    }
}
