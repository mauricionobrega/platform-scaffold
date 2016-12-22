/* eslint-disable import/no-commonjs */

const webpack = require('webpack')
const ip = require('ip')

const loaderConfig = require('./base.loader')
const mainConfig = require('./base.main')
const workerConfig = require('./base.worker')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

mainConfig.module.rules = mainConfig.module.rules.concat({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(['css-loader?-autoprefixer&-url', 'postcss-loader', 'sass-loader']),
    include: [
        /node_modules\/progressive-web-sdk/,
        /app/
    ]
})

mainConfig.output.publicPath = `https://${ip.address()}:8443/`

mainConfig.plugins = mainConfig.plugins.concat([
    new webpack.NoErrorsPlugin()
])

workerConfig.plugins = workerConfig.plugins.concat([
    new webpack.DefinePlugin({
        DEBUG: true
    })
])

module.exports = [mainConfig, loaderConfig, workerConfig]
