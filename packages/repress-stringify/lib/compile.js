'use strict'

const serialize = require('./block-serializer')

module.exports = compile

function compile() {

    if (this.tree.type != 'repress') {
        return 'Not a valid AST type.'
    }

    return serialize(this.tree.data)
}
