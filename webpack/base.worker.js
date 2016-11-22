/* eslint-env node */
/* eslint-disable import/no-commonjs */

// const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './worker/main.js',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'worker.js'
    },
    module: {
        loaders: [{
            name: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: [
                'babel'
            ],
            cacheDirectory: path.join(__dirname, 'tmp')
        }]
    }
}
