/* eslint-disable import/no-commonjs */
/* eslint-env node */

module.exports = {
    title: 'Progressive Web SDK',
    components: './app/components/**/*.jsx',
    serverHost: '0.0.0.0',
    serverPort: 4000,
    skipComponentsWithoutExample: true,
    updateWebpackConfig(webpackConfig) {
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
            }
        )

        return webpackConfig
    },
}
