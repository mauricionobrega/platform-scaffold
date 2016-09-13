// Our tests require our specific Promise polyfill to run properly
global.Promise = require.requireActual('es6-promise');
// Parser tests need to be supplied a selector library
global.$ = require('../static/js/jquery.min.js');
