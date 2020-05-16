'use strict'

module.exports = Parser

function Parser(_, file) {
    this.file = file
}

Parser.prototype.parse = require('./parse')
