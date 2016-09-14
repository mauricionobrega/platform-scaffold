/* https://medium.com/@Yodairish/write-jest-tests-for-webpack-project-823ccda3156#.rxtnm4ku4 */

/* eslint-disable */
'use strict';
var babelJest = require('babel-jest');
var includeStylesSvg = new RegExp(/require\(\s*\'.*\.(scss|svg)\'\);/gm);
var storeStylesSvg = new RegExp(/= require\(\s*\'.*\.(scss|svg)\'\);/gm);
module.exports = {
  process: function(src, filename) {
    return babelJest
      .process(src, filename)
      .replace(storeStylesSvg, '= \'\';')
      .replace(includeStylesSvg, '');
  }
};