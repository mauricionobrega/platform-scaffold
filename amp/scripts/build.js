#!/usr/bin/env node

/**
 * Builds a standalone bundle of the app suitable for deployment,
 * including production dependencies.
 */
const Promise = require('bluebird');
const git = require('git-rev-sync');
const archiver = require('archiver');
const path = require('path');
const process = require('process');
const execSync = require('child_process').execSync;
const rimraf = Promise.promisify(require('rimraf'));
const fs = Promise.promisifyAll(require('fs'));
const ncp = Promise.promisify(require('ncp').ncp);
const chalk = require('chalk');

const ampRootDir = path.resolve(path.join(__dirname), '..')
const buildDir = path.join(ampRootDir, 'build')

const staticInDir = path.join(ampRootDir, 'app', 'static')


const info = (m) => console.log(m)
const success = (m) => console.log(chalk.green(m))
const error = (m) => console.error(chalk.red(m))


const webpack = (outputDir) => execSync(
    `./node_modules/.bin/webpack --output-path ${outputDir}`, {cwd: ampRootDir, stdio: 'inherit'}
)


const installDependencies = (outputDir) => execSync(
    'npm install --only production', {cwd: outputDir, stdio: 'inherit'}
)


const zip = (inDir, outPath) => {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip');
        output.on('close', resolve);
        output.on('end', resolve);
        output.on('finish', resolve);
        archive.pipe(output)
        archive.on('error', reject);
        archive.glob('**/*.*', {cwd: inDir}, {})
        archive.finalize()
    })
}


const build = () => {
    Promise.resolve()
        .then(() => {
            const commitId = git.short()
            const outputDir = path.join(buildDir, commitId)
            const staticOutDir = path.join(outputDir, 'static')
            const serverOutDir = path.join(outputDir, 'server')
            const serverOutZip = path.join(outputDir, 'server.zip')

            return Promise.resolve()
                .tap(() => info('Cleaning build directory'))
                .then(() => rimraf(buildDir))

                .tap(() => info('Creating directories'))
                .then(() => fs.mkdirAsync(buildDir))
                .then(() => fs.mkdirAsync(outputDir))
                .then(() => fs.mkdirAsync(serverOutDir))

                .tap(() => info('Copying static assets'))
                .then(() => ncp(staticInDir, staticOutDir))

                .tap(() => info('Installing dependencies'))
                .then(() => ncp(path.join(ampRootDir, 'package.json'), path.join(serverOutDir, 'package.json')))
                .then(() => installDependencies(serverOutDir))

                .tap(() => info('Building app'))
                .then(() => webpack(serverOutDir))

                .tap(() => info('Creating Zip archive'))
                .then(() => zip(serverOutDir, serverOutZip))
                .then(() => rimraf(serverOutDir))

                .tap(() => success(`Built version '${commitId}' successfully`))
        })
        .catch(err => {
            error(err)
            process.exit(1);
        })
}


build()
