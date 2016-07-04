var path = require('path');
var webpack = require('webpack');
var lodash = require('lodash');

module.exports = [{
    devtool: 'cheap-source-map',
    entry: './app/main.jsx',
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'app.js'
    },
    resolve: {
        alias: {
          'react': path.join(__dirname, 'node_modules', 'react'),
        },
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                },
                cacheDirectory: __dirname + '/tmp'
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
    devServer: {
         contentBase: 'build/',
    }
},
{
    devtool: 'cheap-source-map',
    entry: './app/loader.js',
    output: {
        path: __dirname + '/build',
        filename: 'loader.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                },
                cacheDirectory: __dirname + '/tmp'
            },
        ],
    }
}]
