/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
    devtool: 'cheap-source-map',
    entry: './app/loader.js',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'loader.min.js'
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
        ],
    },
    postcss: () => {
        return [
            autoprefixer({
                browsers: [
                    'iOS >= 6.0',
                    'Android >= 2.3',
                    'last 4 ChromeAndroid versions'
                ]
            })
        ]
    }
}
