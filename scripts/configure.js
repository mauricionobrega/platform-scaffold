const Promise = require('bluebird')

const chalk = require('chalk')
const path = require('path')
const exec = Promise.promisify(require('child_process').exec)

process.stdin.resume();
process.stdin.setEncoding('utf8');

const printCheckMark = () => {
    process.stdout.write(chalk.green(' ✓\n'))
    return Promise.resolve()
}

const removeGit = () => {
    process.stdout.write('Removing old git ')
    return exec('rm -Rf test.txt').then(printCheckMark)
}

const initGit = () => {
    process.stdout.write('Initialize git repo ')
    return exec('git init && git add . && git commit -m "Initial commit"').then(printCheckMark)
}

removeGit()
    .then(initGit)
    .then(() => {
        process.exit(0)
    })
