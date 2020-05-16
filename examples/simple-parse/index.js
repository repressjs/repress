const repress = require('repressjs')

const input = '<!-- wp:paragraph --><p>Test Paragraph</p><!-- /wp:paragraph -->'
const ast = repress().parse(input)
const output = repress().stringify(ast)
console.log(output)
