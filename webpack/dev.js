/* eslint-disable import/no-commonjs */

const webpack = require('webpack')
const ip = require('ip')

const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')
const dashboard = new Dashboard()

const loaderConfig = require('./base.loader')
const mainConfig = require('./base.main')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

mainConfig.entry = mainConfig.entry.concat([
    `webpack-dev-server/client?https://${ip.address()}:8443/`,
    'webpack/hot/only-dev-server'
])

mainConfig.module.loaders = mainConfig.module.loaders.concat({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(['css?-autoprefixer', 'postcss', 'sass']),
    include: [
        /progressive-web-sdk/,
        /app/
    ]
})

console.log(mainConfig.module.loaders)

mainConfig.output.publicPath = `https://${ip.address()}:8443/`

mainConfig.plugins = mainConfig.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new DashboardPlugin(dashboard.setData)
])

// Ensure the react-hot-loader is applied before the babel-loader
mainConfig.module.loaders = mainConfig.module.loaders.map((loader) => {
    if (loader.name === 'babel-loader') {
        loader.loaders.unshift('react-hot')
    }
    return loader
})

module.exports = [mainConfig, loaderConfig]
