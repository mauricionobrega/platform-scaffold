/* eslint-env node */

'use strict'

const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const prompt = Promise.promisifyAll(require('prompt'))
const template = require('lodash.template')

const APP_CONTAINER_DIR = path.join('app', 'containers')
const FILE_ENCODING = 'utf8'
const SKELETON_DIR = 'page-skeleton'

const USER_INPUT_SCHEMA = [
    {
        name: 'name',
        description: 'Enter the (camelCase) name of the page you want to add',
        type: 'string'
    }
]

const substituteVariables = (filename, page) => {
    return fs.readFileAsync(path.resolve(filename), page)
        .then((contents) => template(contents, {variable: 'page'})(page))
}

const getUserInput = () => {
    prompt.start()
    return prompt.getAsync(USER_INPUT_SCHEMA)
        .then((page) => {
            page.Name = page.name.replace(/^[a-z]/, (c) => c.toUpperCase())
            return page
        })
}

getUserInput()
    .tap((page) => fs.mkdirAsync(path.join(APP_CONTAINER_DIR, page.name)))
    .then((page) => {
        return [page, fs.readdirAsync(SKELETON_DIR)]
    })
// No destructuring in Node 4.x
    .spread((page, filenames) => {
        return Promise.map(filenames, (fn) => {
            return substituteVariables(path.join(SKELETON_DIR, fn), page)
                .then((contents) => {
                    return fs.writeFileAsync(
                        path.join(APP_CONTAINER_DIR, page.name, fn),
                        contents,
                        FILE_ENCODING
                    )
                })

        })
    })
    .then(() => console.log('Finished'))
