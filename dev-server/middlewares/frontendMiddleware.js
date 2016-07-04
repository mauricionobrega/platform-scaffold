"use strict"

const path = require('path')

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const compiler = webpack(webpackConfig)
    const middleware = webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig[0].output.publicPath,
        silent: true,
        stats: 'errors-only',
    })

    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))

    // Since webpackDevMiddleware uses memory-fs internally to store build
    // artifacts, we use it instead
    const fs = middleware.fileSystem

    app.get('*', (req, res) => {
        fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
            if (err) {
                res.sendStatus(404)
            } else {
                res.send(file.toString())
            }
        })
    })
}

const addCORSMiddleware = app => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*")
        next()
    })
}

module.exports = (app, options) => {
    let webpackConfig
    if (options['webpack-config']) {
        webpackConfig = require(path.join('../../', options['webpack-config']))
    } else {
        webpackConfig = require('../../webpack.config')
    }

    addDevMiddlewares(app, webpackConfig)
    addCORSMiddleware(app)

    return app
}
