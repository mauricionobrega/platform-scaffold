/* eslint-disable no-console */

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
    error: err => {
        console.error(chalk.red(err))
    },

    // Called when express.js app starts on given port w/o errors
    appStarted: (port) => {
        console.log(`Server started ${chalk.green('✓')}`)

        console.log(
            chalk.bold('Access URLs:') + '\n' +
            divider + '\n' +
            'Localhost: ' + chalk.magenta(`https://localhost:${port}`) + '\n' +
            'LAN: ' + chalk.magenta(`https://${ip.address()}:${port}`) + '\n' +
            divider + '\n' +
            chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)
        )
    },
}

module.exports = logger
