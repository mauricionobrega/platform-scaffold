/* eslint-env node */

'use strict'

const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const template = require('lodash.template')

const APP_CONTAINER_DIR = path.join(__dirname, 'app', 'containers')

fs.readdirAsync(APP_CONTAINER_DIR)
    // First filter to only directories.
    .then((items) => Promise.map(items, (item) => {
        return fs.statAsync(path.join(APP_CONTAINER_DIR, item))
            .then((stats) => stats.isDirectory() ? item : null)
    }))
    .then((items) => items.filter((item) => item !== null))
    // Then filter to directories containing reducer.js
    .then((dirs) => Promise.map(dirs, (dir) => {
        return fs.statAsync(path.join(APP_CONTAINER_DIR, dir, 'reducer.js'))
            .then((stats) => stats.isFile() ? dir : null)
            .catch(() => null)
    }))
    .then((dirs) => dirs.filter((dir) => dir !== null))
    // Generate JS identifiers for the reducers
    .then((dirs) => dirs.map((directory) => {
        return {
            directory,
            identifier: directory.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
        }
    }))
    .then((containers) => {
        return fs.readFileAsync(path.resolve('reducers.template.js'), 'utf8')
            .then((scriptTemplate) => {
                return [scriptTemplate, {containers}]
            })
    })
    .spread((scriptTemplate, context) => template(scriptTemplate, {variable: 'context'})(context))
    .then((script) => fs.writeFileAsync(
        path.join(APP_CONTAINER_DIR, 'reducers.js'),
        script,
        'utf8'
    ))
