#!/usr/bin/env node

/**
 * Builds a standalone bundle of the app suitable for deployment,
 * including production dependencies.
 */
const Promise = require('bluebird');
const Git = require('nodegit');
const archiver = require('archiver');
const path = require('path');
const process = require('process');
const exec = require('child_process').exec;
const rimraf = Promise.promisify(require('rimraf'));
const fs = Promise.promisifyAll(require('fs'));
const ncp = Promise.promisify(require('ncp').ncp);

const ampRootDir = path.resolve(path.join(__dirname), '..')
const buildDir = path.join(ampRootDir, 'build')

const staticInDir = path.join(ampRootDir, 'app', 'static')


const repoIsClean = (repo) => repo.getStatus().then(statuses => statuses.length === 0);


/**
 * Wrap a subprocess called through exec() in a promise.
 */
const execPromise = (cmd, opts={}) => {
    return new Promise((resolve, reject) => {
        const child = exec(cmd, opts, (err, stdout, stderr) => err ? reject(err) : resolve(stdout))
        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)
    })
}

const webpack = (outputDir) => execPromise(
    `./node_modules/.bin/webpack --output-path ${outputDir}`, {cwd: ampRootDir}
)

const installDependencies = (outputDir) => execPromise(
    'npm install --only production', {cwd: outputDir}
)

const zip = (inDir, outPath) => {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip');
        const split = inDir.split(path.sep).filter(x => x !== '');
        const name = split.length > 0 ? split[split.length -1] : inDir;
        output.on('close', resolve);
        output.on('end', resolve);
        output.on('finish', resolve);
        archive.pipe(output)
        archive.on('error', reject);
        archive.directory(inDir, name)
        archive.finalize()
    })
}


const log = console.log;


const build = () => {
    Git.Repository.open(path.resolve(__dirname, "../../.git"))
        .then(repo => Promise.all([Promise.resolve(repo), repoIsClean(repo), repo.getHeadCommit()]))
        .then(([repo, clean, commit]) => {
            const commitId = commit.id().tostrS()
            const outputDir = path.join(buildDir, commitId)
            const staticOutDir = path.join(outputDir, 'static')
            const serverOutDir = path.join(outputDir, 'server')
            const serverOutZip = path.join(outputDir, 'server.zip')

            return (!clean ? Promise.resolve() : Promise.reject(`The repository has uncommitted changes, aborting`))

                .tap(() => log('Cleaning build directory'))
                .then(() => rimraf(buildDir))

                .tap(() => log('Creating directories'))
                .then(() => fs.mkdirAsync(buildDir))
                .then(() => fs.mkdirAsync(outputDir))
                .then(() => fs.mkdirAsync(serverOutDir))

                .tap(() => log('Copying static assets'))
                .then(() => ncp(staticInDir, staticOutDir))

                .tap(() => log('Installing dependencies'))
                .then(() => ncp(path.join(ampRootDir, 'package.json'), path.join(serverOutDir, 'package.json')))
                .then(() => installDependencies(serverOutDir))

                .tap(() => log('Building app'))
                .then(() => webpack(serverOutDir))

                // .tap(() => log('Creating Zip archive'))
                // .then(() => zip(serverOutDir, serverOutZip))
                // .then(() => rimraf(serverOutDir))
        })
        .then(log('Built successfully'))
        .catch(err => {
            console.error(err)
            process.exit(1);
        })
}


build()
