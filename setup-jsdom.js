/* eslint-env node */
/* eslint-disable import/no-commonjs */
const fs = require('fs')
const jsdom = require('jsdom')
/* eslint-enable import/no-commonjs */
const jQuery = fs.readFileSync(`${__dirname}/static/js/jquery.min.js`, 'utf-8')
jsdom.env({
    html: '<html><body></body></html>',
    src: [jQuery],
    done: (error, window) => {
        global.window = window
        global.document = window.document
        global.navigator = window.navigator
    }
})
