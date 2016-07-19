/* eslint-env node */
/* eslint-disable import/no-commonjs */

const Promise = require('bluebird')

const chalk = require('chalk')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const prompt = Promise.promisifyAll(require('prompt'))
const template = require('lodash.template')

const APP_CONTAINER_DIR = path.join('app', 'containers')
const APP_COMPONENT_DIR = path.join('app', 'components')

const camel2Pascal = (name) => name.replace(/^[a-z]/, (c) => c.toUpperCase())
const camel2dashed = (name) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
const dashed2camel = (name) => name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
const Pascal2camel = (name) => name.replace(/^[A-Z]/, (c) => c.toLowerCase())

const greenWrite = (text) => process.stdout.write(chalk.green(text))
const redWrite = (text) => process.stdout.write(chalk.red(text))
const printCheckMark = () => greenWrite(' ✓\n')
const errorOut = (message) => () => {
    redWrite(message)
    process.exit()
}

const getUserInput = (schema) => {
    prompt.start()
    return prompt.getAsync(schema)
}

const getGeneratorAsset = (fn) => {
    return fs.readFileAsync(path.join(__dirname, fn), 'utf8')
}

const processTemplate = (varname, context) => (templateString) =>
      template(templateString, {variable: varname})(context)

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
    APP_COMPONENT_DIR,

    camel2Pascal,
    camel2dashed,
    dashed2camel,
    Pascal2camel,

    greenWrite,
    redWrite,
    printCheckMark,
    errorOut,

    getUserInput,
    getGeneratorAsset,
    processTemplate,
    clearNulls,

    step,
    spreadStep,
}
