/* eslint-disable import/no-commonjs */
/* eslint-env node */

const Promise = require('bluebird')
const chalk = require('chalk')
const path = require('path')
const exec = Promise.promisify(require('child_process').exec)
const rimraf = Promise.promisify(require('rimraf'))

const common = require('../common')

const FILE_ENCODING = 'utf8'

process.stdin.resume()
process.stdin.setEncoding(FILE_ENCODING)

const printDivider = () => {
    process.stdout.write(chalk.gray('\n----------------------------------------------\n\n'))
}

const removeGit = common.step('Removing old .git directory ', () => rimraf('.git/'))

const initGit = common.step(
    'Initialize git repo ',
    () => exec('git init && git add . && git commit -m "Initial commit"')
)

const projectInfoSchema = [
    {
        name: 'slug',
        description: 'Enter your project slug',
        type: 'string'
    },
    {
        name: 'url',
        description: 'What is the url of your website?',
        type: 'string'
    }
]

const processUserInput = (options) => {
    options.encodedUrl = options.url ? encodeURIComponent(options.url) : '<preview-url>'
    return options
}

const writeReadme = common.step(
    'Updating README.md ',
    (options) => common.transformFile(
        path.join('setup', 'README.md'),
        options,
        'README.md'
    )
)

const cleanup = () => rimraf(path.join('generator', 'setup'))

removeGit()
    .then(() => common.getUserInput(projectInfoSchema))
    .then(processUserInput)
    .then(writeReadme)
    .then(cleanup)
    .then(initGit)
    .then(() => {
        printDivider()
        common.greenWrite('Your project is now ready to go.\n')
        common.greenWrite('Follow the steps in README.md to run the app.\n')
        common.greenWrite('You must still set up a remote for Git: ')
        process.stdout.write(chalk.blue('https://help.github.com/articles/adding-a-remote/\n'))
        process.exit(0)
    })
    .catch((e) => {
        console.error(e)
    })
