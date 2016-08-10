/* eslint-disable import/no-commonjs */
global.document = require('jsdom').jsdom('<body></body>')
/* eslint-enable import/no-commonjs */
global.window = document.defaultView
global.navigator = window.navigator
