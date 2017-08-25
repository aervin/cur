const assert = require('assert')
const usd = require('./usd-please')
const colors = require('colors')

const pass = desc => console.log(`${desc} ${colors.bgGreen.black(`PASS!`)}\n`)
const fail = desc => console.log(`${desc} ${colors.bgRed(`FAIL!`)}`)

const start = Date.now()
let testCount = 0

console.log(`Testing usd-please...\n`)

/**
 * The transform API should only return a string
 * or undefined if the first arg is a number
 */
testCount++
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
testCount++
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

testCount++
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

/**
 * The transform API should round floats
 * down to 2 digits
 */
testCount++
result = usd.transform(1234.56112, true)
const roundsCentsDown = `It should round cents down...`
try {
    assert.strictEqual(result, '1,234.56')
    pass(roundsCentsDown)
} catch (e) {
    fail(roundsCentsDown)
    console.log(e.message)
    return
}

/**
 * The transform API should round floats
 * up to 2 digits
 */
testCount++
result = usd.transform(1234.56712, true)
const roundsCentsUp = `It should round cents up...`
try {
    assert.strictEqual(result, '1,234.57')
    pass(roundsCentsUp)
} catch (e) {
    fail(roundsCentsUp)
    console.log(e.message)
    return
}

/**
 * The transform API should round to
 * a whole integer if the second argument
 * is false
 */
testCount++
result = usd.transform(1234.56712, false)
expected = '1,235'
const roundToWholeInt = `It should round to whole integer ${expected}...`
try {
    assert.strictEqual(result, expected)
    pass(roundToWholeInt)
} catch (e) {
    fail(roundToWholeInt)
    console.log(`${result} !== ${expected}`)
    return
}


/**
 * Exiting...
 */
const end = Date.now()

const time = end - start
console.log(`\
    Passing: ${colors.bgGreen.black(`${testCount}/${testCount}`)}

    It took ${colors.bgCyan.black(`${time}ms`)} to run these tests.

    That's ${colors.bgBlack((time / testCount).toFixed(2) + `ms/test`)}.

    Exiting...
`)
