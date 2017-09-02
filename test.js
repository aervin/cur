const assert = require("assert")
const usd = require("./usd-please")
const colors = require("colors")

const pass = desc => console.log(`${desc} ${colors.bgGreen.black(`PASS!`)}\n`)
const fail = desc => console.log(`${desc} ${colors.bgRed(`FAIL!`)}`)

const start = Date.now()

console.log(`${colors.bgYellow.black(`Testing usd-please...\n`)}`)

let testCount = 1
let result = usd(1234.56, false)
let expected = "string"
let testDesc = `[${testCount}] It should return a string...`
try {
    assert.strictEqual(typeof result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [2]
 */
testCount++
result = usd("1234.56", false)
expected = undefined
testDesc = `[${testCount}] It should return undefined...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [3]
 */
testCount++
result = usd(1234.56, true)
expected = "1,234.56"
testDesc = `[${testCount}] It should return with 56 cents...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [4]
 */
testCount++
result = usd(1234.56112, true)
expected = "1,234.56"
testDesc = `[${testCount}] It should round cents down...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [5]
 */
testCount++
result = usd(1234.56712, true)
expected = "1,234.57"
testDesc = `[${testCount}] It should round cents up...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [6]
 */
testCount++
result = usd(1234.56712, false)
expected = "1,235"
testDesc = `[${testCount}] It should round to whole integer ${expected}...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [7]
 */
testCount++
result = usd(1234.2, true)
expected = "1,234.20"
testDesc = `[${testCount}] It should make .2 cents into .20 cents...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [8]
 */
testCount++
result = usd(0.2, true)
expected = ".20"
testDesc = `[${testCount}] It should make .2 into .20...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [9]
 */
testCount++
result = usd(-10.2, true)
expected = "-10.20"
testDesc = `[${testCount}] It should return a negative number...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [10]
 */
testCount++
result = usd(-10.6, false)
expected = "-11"
testDesc = `[${testCount}] It should return a negative whole number...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [11]
 */
testCount++
result = usd(-107654.3, false)
expected = "-107,654"
testDesc = `[${testCount}] It should return ${expected}...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [12]
 */
testCount++
result = usd(-107654.3, true)
expected = "-107,654.30"
testDesc = `[${testCount}] It should return ${expected}...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * [13]
 */
testCount++
result = usd(-107654.3578, true)
expected = "-107,654.36"
testDesc = `[${testCount}] It should return ${expected}...`
try {
    assert.strictEqual(result, expected)
    pass(testDesc)
} catch (e) {
    fail(testDesc)
    console.log(`${result} !== ${expected}`)
    process.exit(1)
}

/**
 * Add additional assertion tests here
 */

/**
 * Exiting...
 */
const end = Date.now()

const time = end - start
console.log(
    `\
    Passing: ${colors.bgGreen.black(`${testCount}/${testCount}`)}

    It took ${colors.bgCyan.black(`${time}ms`)} to run these tests.

    That's ${colors.bgBlack((time / testCount).toFixed(2) + `ms/test`)}.

    Exiting...
`
)

process.exit(0)
