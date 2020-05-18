'use strict'

const wp = require('@wordpress/block-serialization-default-parser')
const _ = require('lodash')

module.exports = parse

function blockToNode(block) {

    var children = []

    if (block.innerBlocks && block.innerBlocks.length > 0) {
        children = block.innerBlocks.map(function (value) { return blockToNode(value) })
    }

    return {
        type: block.blockName,
        data: {
            meta: block.attrs,
            innerHTML: block.innerHTML,
        },
        value: block.innerContent,
        children: children,
    }
}

function parse() {

    const node = {
        type: 'root',
        children: []
    }

    const parsedBlocks = wp.parse(String(this.file))

    return {
        type: 'root',
        children: parsedBlocks.map(function (block) { return blockToNode(block) })
    }
}
