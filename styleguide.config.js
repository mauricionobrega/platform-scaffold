/* eslint-disable import/no-commonjs */
/* eslint-env node */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    title: 'Progressive Web SDK',
    components: './app/components/**/*.jsx',
    serverHost: '0.0.0.0',
    serverPort: 4000,
    skipComponentsWithoutExample: true,
    updateWebpackConfig(webpackConfig) {
        // Plugins
        webpackConfig.plugins.push(
            new ExtractTextPlugin('css/[name].css')
        )

        // Loaders
        webpackConfig.module.loaders.push(
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: __dirname,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                },
                cacheDirectory: `${__dirname}/tmp`
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css', 'sass']),
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                loader: 'text'
            }
        )

        return webpackConfig
    },
}
