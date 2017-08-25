const assert = require('assert')
const usd = require('./usd-please')

console.log(`Testing usd-please...\n`)

/**
 * The transform API should only return a string
 * or undefined if the first arg is a number
 */
let result = usd.transform(1234.56, false)
const returnsString = `It should return a string...`
try {
    assert.strictEqual(result, '1,235')
    assert.strictEqual(typeof result, 'string')
    console.log(`${returnsString} PASS!\n\n`)
} catch (e) {
    console.log(`${returnsString} FAIL!\n`)
    throw new Error(e)
}

/**
 * The transform API should return undefined if
 * first argument is not of type "number"
 */
result = usd.transform('1234.56', false)
const returnsUndefined = `It should return undefined...`
try {
    assert.strictEqual(result, undefined)
    console.log(`${returnsUndefined} PASS!\n\n`)   
} catch(e) {
    console.log(`${returnsUndefined} FAIL!\n\n`)   
}
