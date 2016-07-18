/* eslint-env node */
/* eslint-disable import/no-commonjs */

const Promise = require('bluebird')

const chalk = require('chalk')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const prompt = Promise.promisifyAll(require('prompt'))
const template = require('lodash.template')

const APP_CONTAINER_DIR = path.join('app', 'containers')
const FILE_ENCODING = 'utf8'
const SKELETON_DIR = 'page-skeleton'

const camel2Pascal = (name) => name.replace(/^[a-z]/, (c) => c.toUpperCase())
const camel2dashed = (name) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

const USER_INPUT_SCHEMA = [
    {
        name: 'name',
        description: 'Enter the (camelCase) name of the page you want to add',
        type: 'string'
    }
]

const greenWrite = (text) => process.stdout.write(chalk.green(text))

const getUserInput = () => {
    prompt.start()
    return prompt.getAsync(USER_INPUT_SCHEMA)
        .then((page) => {
            page.Name = camel2Pascal(page.name)
            page.dirname = camel2dashed(page.name)
            return page
        })
}

const makePageDir = (page) => {
    return fs.mkdirAsync(path.join(APP_CONTAINER_DIR, page.dirname))
         .catch(() => {
             console.log(`Page already exists under that name: ${path.join(APP_CONTAINER_DIR, page.dirname)}`)
             process.exit()
         })
}

const substituteVariables = (filename, page) => {
    return fs.readFileAsync(path.resolve(filename), FILE_ENCODING)
        .then((contents) => template(contents, {variable: 'page'})(page))
}

getUserInput()
    .tap((page) => process.stdout.write(`Creating container directory ${page.dirname} `))
    .tap(makePageDir)
    .tap(() => greenWrite(' ✓\n'))
    .tap(() => process.stdout.write('Processing container template'))
    .then((page) => {
        return [page, fs.readdirAsync(SKELETON_DIR)]
    })
// No destructuring in Node 4.x
    .spread((page, filenames) => {
        return Promise.map(filenames, (fn) => {
            return substituteVariables(path.join(SKELETON_DIR, fn), page)
                .then((contents) => {
                    return fs.writeFileAsync(
                        path.join(APP_CONTAINER_DIR, page.dirname, fn),
                        contents,
                        FILE_ENCODING
                    )
                })

        })
    })
    .then(() => greenWrite(' ✓\n'))
    .then(() => console.log('Finished'))
