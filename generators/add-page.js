/* eslint-env node */
/* eslint-disable import/no-commonjs */

const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))
const path = require('path')

const common = require('./common')

const FILE_ENCODING = 'utf8'
const SKELETON_DIR = 'generators/page-skeleton'

const USER_INPUT_SCHEMA = [
    {
        name: 'name',
        description: 'Enter the (camelCase) name of the page you want to add',
        type: 'string'
    }
]

const makePageDir = (page) => {
    return fs.mkdirAsync(path.join(common.APP_CONTAINER_DIR, page.dirname))
         .catch(() => {
             common.redWrite(
                 /* eslint-disable max-len */
                 `\nA page already exists under that name: ${path.join(common.APP_CONTAINER_DIR, page.dirname)}\n`
                 /* eslint-enable max-len */
             )
             process.exit()
         })
}

common.getUserInput(USER_INPUT_SCHEMA)
    .then((page) => {
        page.Name = common.camel2Pascal(page.name)
        page.dirname = common.camel2dashed(page.name)
        return page
    })
    .tap((page) => process.stdout.write(`Creating container directory ${page.dirname} `))
    .tap(makePageDir)
    .tap(() => common.greenWrite(' ✓\n'))
    .tap(() => process.stdout.write('Processing container template'))
    .then((page) => {
        return [page, fs.readdirAsync(SKELETON_DIR)]
    })
// No destructuring in Node 4.x
    .spread((page, filenames) => {
        return Promise.map(filenames, (fn) => {
            return fs.readFileAsync(path.join(SKELETON_DIR, fn), FILE_ENCODING)
                .then(common.processTemplate('page', page))
                .then((contents) => {
                    return fs.writeFileAsync(
                        path.join(common.APP_CONTAINER_DIR, page.dirname, fn),
                        contents,
                        FILE_ENCODING
                    )
                })

        })
    })
    .then(() => common.greenWrite(' ✓\n'))
    .then(() => console.log('Finished'))
