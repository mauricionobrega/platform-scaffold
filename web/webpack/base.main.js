/* eslint-disable import/no-commonjs */
/* eslint-env node */

const webpack = require('webpack')
const path = require('path')
const baseCommon = require('./base.common')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const analyzeBundle = process.env.MOBIFY_ANALYZE === 'true'

const config = {
    devtool: 'cheap-source-map',
    entry: [
        'whatwg-fetch',
        './app/main.jsx',
    ],
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => /node_modules/.test(module.resource)
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new CopyPlugin([
            {from: 'app/static/', to: 'static/'}
        ]),
        new webpack.DefinePlugin({
            PROJECT_SLUG: JSON.stringify(require('../package.json').projectSlug), // eslint-disable-line import/no-extraneous-dependencies
            AJS_SLUG: JSON.stringify(require('../package.json').aJSSlug) // eslint-disable-line import/no-extraneous-dependencies
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: baseCommon.postcss
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: `${__dirname}/tmp`
                    }
                }
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.svg$/,
                use: 'text-loader'
            }
        ],
    }
}

if (analyzeBundle) {
    console.info('Analyzing build...')
    config.plugins = config.plugins.concat([
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true
        })
    ])
}

// Prepare entries for async loading:
// Webpack doesn't support async loading of the commons and entry bundles out of the box
// Replace `webpackJsonp` calls with `webpackJsonpAsync` and implement the latter in loader
// so that it waits for the vendor script to finish loading
// before running the webpackJsonp with the received arguments.
config.plugins.push(function() {
    this.plugin('after-compile', (compilation, callback) => {
        for (const file in compilation.assets) {
            if (/\.js$/.test(file) && !(/^vendor/.test(file))) {
                const children = compilation.assets[file].children
                if (!children || !children[0]) {
                    continue
                }

                const source = children[0]
                source._value = source._value.replace(/^webpackJsonp/, 'webpackJsonpAsync')
            }
        }

        callback()
    })
})

module.exports = config
