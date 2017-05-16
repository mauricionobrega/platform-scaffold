var webpack = require('webpack');
var path = require('path');
var fs = require('fs');


module.exports = {
    entry: './app/main.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'main.js'
    },
    externals: {
        express: 'commonjs express',
        jsdom: 'commonjs jsdom',
        encoding: 'commonjs encoding',
        ajv: 'commonjs ajv'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: `${__dirname}/build/tmp`
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'css-loader', options: {minimize : true}},
                    {loader: 'sass-loader'}
                ]
            }
        ]
    },
    devtool: 'sourcemap'
}
