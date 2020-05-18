const repress = require('repressjs')

const input = '<!-- wp:paragraph -->Root content.<!-- wp:third-party/block {"custom-attribute":"the value"} -->Nested third party content.<!-- /wp:third-party/block --><!-- wp:paragraph --><p>Nested Paragraph</p><!-- /wp:paragraph --><!-- /wp:paragraph -->'

const ast = repress().parse(input)
const output = repress().stringify(ast)

console.log('Blocks to AST:\n', JSON.stringify(ast, null, 2))
console.log('AST to Block:\n', output)
