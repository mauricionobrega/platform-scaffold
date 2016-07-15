const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../webpack/dev.js')

const addMiddleware = require('./middlewares/frontendMiddleware')
const logger = require('./logger')

const argv = require('minimist')(process.argv.slice(2))
const port = argv.port || process.env.PORT || 8443

const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
    https: true,
    hot: true,
    stats: {
        // Configures logging: https://webpack.github.io/docs/node.js-api.html#stats
        assets: false,
        colors: true,
        version: false,
        hash: false,
        chunks: true,
        chunkModules: false
    }
})

addMiddleware(server)

server.listen(port, (err) => {
    if (err) {
        return logger.error(err.message)
    }
    logger.appStarted(port)
    logger.waitForBuild()
})
