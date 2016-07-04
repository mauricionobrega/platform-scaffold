const express = require('express')
const logger = require('./logger')
const https = require('https')
const fs = require('fs')

const setup = require('./middlewares/frontendMiddleware');
const argv = require('minimist')(process.argv.slice(2))
const resolve = require('path').resolve
const app = express()

const port = argv.port || process.env.PORT || 8443

setup(app, {
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/',
    webpackConfig: argv['webpack-config']
})

// Using self signed cert in order to use https for the dev server
const httpsOptions = {
    key: fs.readFileSync(resolve(process.cwd(), './dev-server/ssl/key.pem')),
    cert: fs.readFileSync(resolve(process.cwd(), './dev-server/ssl/cert.pem'))
}

https.createServer(httpsOptions, app).listen(port, (err) => {
    if (err) {
        return logger.error(err.message)
    }

    logger.appStarted(port)
})
