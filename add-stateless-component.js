/* eslint-env node */
/* eslint-disable import/no-commonjs */

const Promise = require('bluebird')

const chalk = require('chalk')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const prompt = Promise.promisifyAll(require('prompt'))
const template = require('lodash.template')

const APP_COMPONENT_DIR = path.join('app', 'components')
const FILE_ENCODING = 'utf8'
const SKELETON_DIR = 'page-skeleton'

const camel2Pascal = (name) => name.replace(/^[a-z]/, (c) => c.toUpperCase())
const Pascal2camel = (name) => name.replace(/^[A-Z]/, (c) => c.toLowerCase())
const camel2dashed = (name) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

const USER_INPUT_SCHEMA = [
    {
        name: 'Name',
        description: 'Enter the (PascalCase) name of the component you want to add',
        type: 'string'
    }
]

const greenWrite = (text) => process.stdout.write(chalk.green(text))
const redWrite = (text) => process.stdout.write(chalk.red(text))

const checkComponentDir = () => {
    return fs.statAsync(APP_COMPONENT_DIR)
        .catch(() => fs.mkdirAsync(APP_COMPONENT_DIR))
}

const getUserInput = () => {
    prompt.start()
    return prompt.getAsync(USER_INPUT_SCHEMA)
        .then((component) => {
            component.filename = `${camel2dashed(Pascal2camel(component.Name))}.jsx`
            return component
        })
}

const checkComponentExistence = (component) => {
    return fs.statAsync(path.join(APP_COMPONENT_DIR, component.filename))
        .then(() => {
            redWrite(`\nComponent ${component.Name} already exists\n`)
            process.exit()
        })
        .catchReturn(component)
}

const substituteVariables = (filename, component) => {
    return fs.readFileAsync(path.resolve(filename), FILE_ENCODING)
        .then((contents) => template(contents, {variable: 'component'})(component))
}

checkComponentDir()
    .then(getUserInput)
    .tap(() => process.stdout.write('Checking for an existing component'))
    .then(checkComponentExistence)
    .tap(() => greenWrite(' ✓\n'))
    .tap(() => process.stdout.write('Processing component template'))
    .then((component) => {
        return substituteVariables(path.join(__dirname, 'component-skeletons', 'stateless.jsx'), component)
            .tap(() => greenWrite(' ✓\n'))
            .tap(() => process.stdout.write('Writing component file'))
            .then((contents) => {
                return fs.writeFileAsync(
                    path.join(APP_COMPONENT_DIR, component.filename),
                    contents,
                    'utf8'
                )
            })
            .tap(() => greenWrite(' ✓\n'))
    })
    .then(() => console.log('Finished'))
