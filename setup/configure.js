/* eslint-disable import/no-commonjs */
/* eslint-env node */

const Promise = require('bluebird')
const chalk = require('chalk')
const path = require('path')
const exec = Promise.promisify(require('child_process').exec)
const fs = Promise.promisifyAll(require('fs'))
const prompt = Promise.promisifyAll(require('prompt'))
const rimraf = Promise.promisify(require('rimraf'))

const FILE_ENCODING = 'utf8'

process.stdin.resume()
process.stdin.setEncoding(FILE_ENCODING)

const printDivider = () => {
    process.stdout.write(chalk.gray('\n----------------------------------------------\n\n'))
}

const printCheckMark = () => {
    process.stdout.write(chalk.green(' ✓\n'))
    return Promise.resolve()
}

const removeGit = () => {
    process.stdout.write('Removing old git ')
    return exec('rm -Rf .git/').then(printCheckMark)
}

const initGit = () => {
    process.stdout.write('Initialize git repo ')
    return exec('git init && git add . && git commit -m "Initial commit"').then(printCheckMark)
}

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

const getProjectInfo = () => {
    prompt.start()
    return prompt.getAsync(projectInfoSchema)
}

const replaceStrings = (startString, stringsToReplace) => {
    return Object.keys(stringsToReplace).reduce((result, key) => {
        const pattern = new RegExp(`<${key}>`, 'g')
        return result.replace(pattern, stringsToReplace[key])
    }, startString)
}

const writeReadme = (options) => {
    process.stdout.write('Updating README.md ')

    return fs.readFileAsync(path.resolve('setup/README.md'), FILE_ENCODING)
        .then((fileContents) => {
            return replaceStrings(fileContents, options)
        })
        .then((readmeContents) => {
            if (options.url) {
                const encodedUrl = encodeURIComponent(options.url)
                return readmeContents.replace('<preview-url>', encodedUrl)
            }
            return readmeContents
        })
        .then((readmeContents) => {
            return fs.writeFileAsync('README.md', readmeContents, FILE_ENCODING)
        })
        .then(printCheckMark)
}

const cleanup = () => {
    return rimraf(path.resolve('setup/'))
}

removeGit()
    .then(getProjectInfo)
    .then(writeReadme)
    .then(cleanup)
    .then(initGit)
    .then(() => {
        printDivider()
        process.stdout.write(chalk.green('Your project is now ready to go.\n'))
        process.stdout.write(chalk.green('Follow the steps in README.md to run the app.\n'))
        process.stdout.write(chalk.green('You must still set up a remote for Git: '))
        process.stdout.write(chalk.blue('https://help.github.com/articles/adding-a-remote/\n'))
        process.exit(0)
    })
    .catch((e) => {
        console.error(e)
    })
