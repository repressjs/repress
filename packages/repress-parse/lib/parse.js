'use strict'

const wp = require('@wordpress/block-serialization-default-parser')

module.exports = parse

function parse() {
    return {
        type: 'repress',
        data: wp.parse(String(this.file))
    }
}
