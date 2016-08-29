/* eslint-disable import/no-commonjs */

const assign = require('lodash.assign')

const baseLoaderConfig = require('./base.loader')
const baseMainConfig = require('./base.main')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Add production flag to main app config
const productionMainConfig = assign(baseMainConfig, {
    // Extend base config with production settings here
})

baseMainConfig.module.loaders = baseMainConfig.module.loaders.concat({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(['css?-autoprefixer&minification', 'postcss', 'sass']),
    include: [
        /progressive-web-sdk/,
        /app/
    ]
})

module.exports = [productionMainConfig, baseLoaderConfig]
