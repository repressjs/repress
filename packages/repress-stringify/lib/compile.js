'use strict'

const serialize = require('./block-serializer')

module.exports = compile

function nodeToBlock(tree) {

    var blocks = []

    if (tree.children.length > 0) {
        blocks = tree.children.map(function (branch) { return nodeToBlock(branch) })
    }

    if (tree.type == 'root') {
        return blocks
    }

    return {
        blockName: tree.type,
        attrs: tree.data.meta,
        innerBlocks: blocks,
        innerHTML: tree.data.innerHTML,
        innerContent: tree.value,
    }
}

function compile() {
    return serialize(nodeToBlock(this.tree))
}
