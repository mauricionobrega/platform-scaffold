const path = require('path')
const webpack = require('webpack')
const assign = require('lodash.assign')

const baseLoaderConfig = require('./base.loader')
const baseMainConfig = require('./base.main')

// Add production flag to main app config
const productionMainConfig = assign(baseMainConfig, {
    plugins: [].concat(baseMainConfig.plugins,
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    )
})

module.exports = [productionMainConfig, baseLoaderConfig]
