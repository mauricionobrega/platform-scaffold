/* eslint-disable import/no-commonjs */

const webpack = require('webpack')
const assign = require('lodash.assign')

const baseLoaderConfig = require('./base.loader')
const baseMainConfig = require('./base.main')

// Add production flag to main app config
const productionMainConfig = assign(baseMainConfig, {
    plugins: [].concat(baseMainConfig.plugins,
        // Add production plugins here
    )
})

module.exports = [productionMainConfig, baseLoaderConfig]
