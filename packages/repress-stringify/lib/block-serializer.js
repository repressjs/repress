const _ = require('lodash')

const serializeAttributes = (attributes) => {
    return (
        JSON.stringify(attributes)
            // Don't break HTML comments.
            .replace(/--/g, '\\u002d\\u002d')

            // Don't break non-standard-compliant tools.
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026')

            // Bypass server stripslashes behavior which would unescape stringify's
            // escaping of quotation mark.
            //
            // See: https://developer.wordpress.org/reference/functions/wp_kses_stripslashes/
            .replace(/\\"/g, '\\u0022')
    );
}


const getCommentDelimitedContent = (
    rawBlockName,
    attributes,
    content
) => {

    const serializedAttributes = !_.isEmpty(attributes)
        ? serializeAttributes(attributes) + ' '
        : '';

    const blockName = _.startsWith(rawBlockName, 'core/')
        ? rawBlockName.slice(5)
        : rawBlockName;

    if (!rawBlockName) {
        return content;
    }

    if (!content) {
        return `<!-- wp:${blockName} ${serializedAttributes}/-->`;
    }

    return (
        `<!-- wp:${blockName} ${serializedAttributes}-->` +
        content +
        `<!-- /wp:${blockName} -->`
    );
}

const serializeBlock = (
    block,
    options
) => {

    let content = '';

    if (!block) {
        return '';
    }

    let index = 0
    if (!_.isEmpty(block.innerBlocks)) {
        block.innerContent.forEach(chunk => {
            content += _.isString(chunk) ? chunk : serializeBlock(block.innerBlocks[index++], options);
        });
    } else {
        content += block.innerContent.join('')
    }

    return getCommentDelimitedContent(block.blockName, block.attrs, content);
}


const serialize = (blocks, options) => {
    return _.castArray(blocks)
        .map((block) => serializeBlock(block, options))
        .join('\n\n');
}

module.exports = serialize
