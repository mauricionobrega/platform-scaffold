/* eslint-env node */
/* eslint-disable import/no-commonjs */

const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))
const path = require('path')

const common = require('./common')

const SKELETON_DIR = 'page-skeleton'

const USER_INPUT_SCHEMA = [
    {
        name: 'name',
        description: 'Enter the (camelCase) name of the page you want to add',
        type: 'string',
        pattern: /^[a-z]/,
        message: 'The name must begin with a lower-case letter'
    }
]

const processUserInput = (page) => {
    page.Name = common.camel2Pascal(page.name)
    page.dirname = common.camel2dashed(page.name)
    return page
}

const makePageDir = (page) => {
    const pageDir = common.container(page.dirname)
    return fs.mkdirAsync(pageDir)
        .catch(common.errorOut(`\nA page already exists under that name: ${pageDir}\n`))
}

common.getUserInput(USER_INPUT_SCHEMA)
    .then(processUserInput)
    .tap((page) => {
        return Promise.resolve(page)
            .then(common.step(`Creating container directory ${page.dirname}`, makePageDir))
    })
    .then(common.step(
        'Finding component template',
        (page) => [page, common.getGeneratorDir(SKELETON_DIR)]
    ))
// No destructuring in Node 4.x
    .tap(() => process.stdout.write('Generating page container'))
    .spread((page, filenames) => {
        return Promise.map(filenames, (fn) => {
            return common.getGeneratorAsset(path.join(SKELETON_DIR, fn))
                .then(common.processTemplate('page', page))
                .then(common.writeToPath(common.container(path.join(page.dirname, fn))))
        })
    })
    .then(() => common.greenWrite(' ✓\n'))
    .then(() => console.log('Finished'))
