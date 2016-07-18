/* eslint-env node */
/* eslint-disable import/no-commonjs */

const Promise = require('bluebird')

const chalk = require('chalk')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const template = require('lodash.template')

const APP_CONTAINER_DIR = path.join(__dirname, 'app', 'containers')

const printCheckMark = () => process.stdout.write(chalk.green(' ✓\n'))

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

const dashed2camel = (name) => name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())

const clearNulls = (items) => items.filter((item) => item !== null)

const filterDirectories = (items) => {
    return Promise.map(items, (item) => {
        return fs.statAsync(path.join(APP_CONTAINER_DIR, item))
            .then((stats) => { return stats.isDirectory() ? item : null })
    })
        .then(clearNulls)
}

const filterReducers = (dirs) => {
    return Promise.map(dirs, (dir) => {
        return fs.statAsync(path.join(APP_CONTAINER_DIR, dir, 'reducer.js'))
            .then((stats) => { return stats.isFile() ? dir : null })
            .catch(() => null)
    }).then(clearNulls)
}

const containersFromDirs = (dirs) => dirs.map((directory) => {
    return {
        directory,
        identifier: dashed2camel(directory)
    }
})

const getContainers = () => {
    return fs.readdirAsync(APP_CONTAINER_DIR)
        .then(filterDirectories)
        .then(filterReducers)
        .then(containersFromDirs)
}

const getTemplate = (containers) => {
    return fs.readFileAsync(path.resolve('reducers.template.js'), 'utf8')
        .then((scriptTemplate) => {
            return [scriptTemplate, {containers}]
        })
}

const generateRootReducer = (scriptTemplate, context) =>
      template(scriptTemplate, {variable: 'context'})(context)

const writeOutScript = (script) => fs.writeFileAsync(
    path.join(APP_CONTAINER_DIR, 'reducers.js'),
    script,
    'utf8'
)

Promise.resolve()
    .then(step('Finding container directories', getContainers))
    .then(step('Loading root reducer template', getTemplate))
    .then(spreadStep('Generating program text', generateRootReducer))
    .then(step('Writing new root reducer', writeOutScript))
    .then(() => process.stdout.write(chalk.green('Finished successfully\n')))
