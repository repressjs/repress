'use strict'

var unified = require('unified')
var parse = require('repress-parse')
var stringify = require('repress-stringify')

module.exports = unified().use(parse).use(stringify).freeze()
