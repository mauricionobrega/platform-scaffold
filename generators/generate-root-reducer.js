/* eslint-env node */
/* eslint-disable import/no-commonjs */

const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const template = require('lodash.template')

const common = require('./common')

const filterDirectories = (items) => {
    return Promise.map(items, (item) => {
        return fs.statAsync(path.join(common.APP_CONTAINER_DIR, item))
            .then((stats) => { return stats.isDirectory() ? item : null })
    })
        .then(common.clearNulls)
}

const filterReducers = (dirs) => {
    return Promise.map(dirs, (dir) => {
        return fs.statAsync(path.join(common.APP_CONTAINER_DIR, dir, 'reducer.js'))
            .then((stats) => { return stats.isFile() ? dir : null })
            .catch(() => null)
    }).then(common.clearNulls)
}

const containersFromDirs = (dirs) => dirs.map((directory) => {
    return {
        directory,
        identifier: common.dashed2camel(directory)
    }
})

const getContainers = () => {
    return fs.readdirAsync(common.APP_CONTAINER_DIR)
        .then(filterDirectories)
        .then(filterReducers)
        .then(containersFromDirs)
}

const getTemplate = (containers) => {
    return fs.readFileAsync(path.join('generators', 'reducers.template.js'), 'utf8')
        .then((scriptTemplate) => {
            return [scriptTemplate, {containers}]
        })
}

const generateRootReducer = (scriptTemplate, context) =>
      template(scriptTemplate, {variable: 'context'})(context)

const writeOutScript = (script) => fs.writeFileAsync(
    path.join(common.APP_CONTAINER_DIR, 'reducers.js'),
    script,
    'utf8'
)

Promise.resolve()
    .then(common.step('Finding container directories', getContainers))
    .then(common.step('Loading root reducer template', getTemplate))
    .then(common.spreadStep('Generating program text', generateRootReducer))
    .then(common.step('Writing new root reducer', writeOutScript))
    .then(() => common.greenWrite('Finished successfully\n'))
