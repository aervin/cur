const assert = require('assert')
const usd = require('./usd-please')
const colors = require('colors')

const pass = (desc) => console.log(`${desc} ${colors.bgGreen.black(`PASS!`)}\n\n`)
const fail = (desc) => console.log(`${desc} ${colors.bgRed(`FAIL!`)}\n`)

console.log(`Testing usd-please...\n`)

/**
 * The transform API should only return a string
 * or undefined if the first arg is a number
 */
let result = usd.transform(1234.56, false)
const returnsString = `It should return a string...`
try {
    assert.strictEqual(typeof result, 'string')
    pass(returnsString)
} catch (e) {
    fail(returnsString)
    console.log(e.message)
    return
}

/**
 * The transform API should return undefined if
 * first argument is not of type "number"
 */
result = usd.transform('1234.56', false)
const returnsUndefined = `It should return undefined...`
try {
    assert.strictEqual(result, undefined)
    pass(returnsUndefined)
} catch (e) {
    fail(returnsUndefined)
    console.log(e.message)
    return
}

result = usd.transform(1234.56, true)
const returnsWithCents = `It should return with 56 cents...`
try {
    assert.strictEqual(result, '1,234.56')
    pass(returnsWithCents)
} catch (e) {
    fail(returnsWithCents)
    console.log(e.message)
    return
}
