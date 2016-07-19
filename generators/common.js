/* eslint-env node */
/* eslint-disable import/no-commonjs */

const Promise = require('bluebird')

const chalk = require('chalk')
// const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const prompt = Promise.promisifyAll(require('prompt'))
const template = require('lodash.template')

const APP_CONTAINER_DIR = path.join('app', 'containers')

const camel2Pascal = (name) => name.replace(/^[a-z]/, (c) => c.toUpperCase())
const camel2dashed = (name) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

const greenWrite = (text) => process.stdout.write(chalk.green(text))
const redWrite = (text) => process.stdout.write(chalk.red(text))

const processTemplate = (varname, context) => (templateString) =>
      template(templateString, {variable: varname})(context)

const getUserInput = (schema) => {
    prompt.start()
    return prompt.getAsync(schema)
}

module.exports = {
    APP_CONTAINER_DIR,

    camel2Pascal,
    camel2dashed,

    greenWrite,
    redWrite,

    getUserInput,
    processTemplate,
}
