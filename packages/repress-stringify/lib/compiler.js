'use strict'

var xtend = require('xtend')

module.exports = Compiler

// Construct a new compiler.
function Compiler(tree, file) {
    this.tree = tree
    this.file = file
    this.options = xtend(this.options)
}

var proto = Compiler.prototype

proto.compile = require('./compile')
