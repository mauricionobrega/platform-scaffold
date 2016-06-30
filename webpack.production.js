var path = require('path');
var webpack = require('webpack');
var lodash = require('lodash');

var baseDependencies = require('./webpack.config.js');

module.exports = lodash.extend(baseDependencies, {
    plugins: [].concat(baseDependencies.plugins,
        new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify("production")
            }
        })
    )
});
