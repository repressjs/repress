import repress from '.'

test('repress is a processor', () => {
    const result = repress();
    expect(typeof result.parse).toBe('function')
    expect(typeof result.stringify).toBe('function')
})

test('repress can parse', () => {
    const input = '<!-- wp:paragraph --><p>Test Paragraph</p><!-- /wp:paragraph -->'
    const ast = repress().parse(input)
    expect(true).toBe(true)
})
