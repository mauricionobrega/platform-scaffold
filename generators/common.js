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
const dashed2camel = (name) => name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())

const greenWrite = (text) => process.stdout.write(chalk.green(text))
const redWrite = (text) => process.stdout.write(chalk.red(text))
const printCheckMark = () => greenWrite(' ✓\n')

const processTemplate = (varname, context) => (templateString) =>
      template(templateString, {variable: varname})(context)

const getUserInput = (schema) => {
    prompt.start()
    return prompt.getAsync(schema)
}

const clearNulls = (items) => items.filter((item) => item !== null)

const step = (message, operation) => (value) => {
    return Promise.resolve(value)
        .tap(() => process.stdout.write(message))
        .then(operation)
        .tap(printCheckMark)
}

const spreadStep = (message, operation) => (value) => {
    return Promise.resolve(value)
        .tap(() => process.stdout.write(message))
        .spread(operation)
        .tap(printCheckMark)
}


module.exports = {
    APP_CONTAINER_DIR,

    camel2Pascal,
    camel2dashed,
    dashed2camel,

    greenWrite,
    redWrite,
    printCheckMark,

    getUserInput,
    processTemplate,
    clearNulls,

    step,
    spreadStep,
}
