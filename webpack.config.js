const path = require('path');
const webpack = require('webpack');
const ip = require('ip')

module.exports = [{
    devtool: 'cheap-source-map',
    entry: [
        './app/main.jsx',
        `webpack-dev-server/client?https://${ip.address()}:8443/`,
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    ],
    output: {
        path: __dirname + '/build',
        publicPath: `https://${ip.address()}:8443/`,
        filename: '[name].js'
    },
    resolve: {
        alias: {
          'react': path.join(__dirname, 'node_modules', 'react'),
        },
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

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
                loaders: [
                    'react-hot',
                    'babel?presets[]=es2015,presets[]=react'
                ],
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
