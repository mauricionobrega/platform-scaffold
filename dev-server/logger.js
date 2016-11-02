/* eslint-disable no-console, import/no-commonjs */

const chalk = require('chalk')
const ip = require('ip')

const divider = chalk.gray('\n-----------------------------------')

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

    waitForBuild: () => {
        console.log(chalk.yellow('webpack: building bundle...'))
    },

    // Called whenever there's an error on the server we want to print
    error: (err) => {
        console.error(chalk.red(err))
    },

    // Called when express.js app starts on given port w/o errors
    appStarted: (port) => {
        console.log(`Server started ${chalk.green('✓')}`)

        console.log(
            chalk.bold('Access URLs:') + '\n' + // eslint-disable-line prefer-template
            divider + '\n' +
            'Localhost: ' + chalk.magenta(`https://localhost:${port}`) + '\n' +
            'LAN: ' + chalk.magenta(`https://${ip.address()}:${port}`) + '\n' +
            divider
        )

        console.log(
            chalk.bold('Preview URL: ') + // eslint-disable-line prefer-template
            chalk.magenta(`https://preview.mobify.com/?url=http%3A%2F%2Fwww.merlinspotions.com%2F&site_folder=https%3A%2F%2Flocalhost%3A${port}%2Floader.js&disabled=0&domain=&scope=1`) + '\n' +
            divider + '\n' +
            chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`) + '\n'
        )
    },
}

module.exports = logger
