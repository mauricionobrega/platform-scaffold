/* eslint-disable import/no-commonjs */

const assign = require('lodash.assign')

const baseLoaderConfig = require('./base.loader')
const baseMainConfig = require('./base.main')

// Add production flag to main app config
const productionMainConfig = assign(baseMainConfig, {
    // Extend base config with production settings here
})

module.exports = [productionMainConfig, baseLoaderConfig]
