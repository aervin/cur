const assert = require('assert')
const usd = require('./usd-please')
const colors = require('colors')

const pass = desc => console.log(`${desc} ${colors.bgGreen.black(`PASS!`)}\n`)
const fail = desc => console.log(`${desc} ${colors.bgRed(`FAIL!`)}`)

const start = Date.now()
let testCount = 0

console.log(`${colors.bgYellow.black(`Testing usd-please...\n`)}`)

testCount++
let result = usd(1234.56, false)
let expected = 'string'
let testDesc = `[${testCount}] It should return a string...`
try {
    assert.strictEqual(typeof result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    return
}

testCount++
result = usd('1234.56', false)
expected = undefined
testDesc = `[${testCount}] It should return undefined...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    return
}

testCount++
result = usd(1234.56, true)
expected = '1,234.56'
testDesc = `[${testCount}] It should return with 56 cents...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    return
}

testCount++
result = usd(1234.56112, true)
expected = '1,234.56'
testDesc = `[${testCount}] It should round cents down...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    return
}

testCount++
result = usd(1234.56712, true)
expected = '1,234.57'
testDesc = `[${testCount}] It should round cents up...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    return
}

testCount++
result = usd(1234.56712, false)
expected = '1,235'
testDesc = `[${testCount}] It should round to whole integer ${expected}...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    return
}

testCount++
result = usd(1234.2, true)
expected = '1,234.20'
testDesc = `[${testCount}] It should make .2 cents into .20 cents...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    return
}

/**
 * Add additional assertion tests here
 */

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
