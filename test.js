const assert = require('assert')
const usd = require('./usd-please')
const colors = require('colors')
const fs = require('fs')

const pass = desc => console.log(`${desc} ${colors.bgGreen.black(`PASS`)}\n`)
const fail = desc => console.log(`${desc} ${colors.bgRed(`FAIL!`)}`)

const start = Date.now()

console.log(`${colors.bgYellow.black(`Testing usd-please...\n`)}`)

const getAllFiles = function(directory, fileList = []) {
    const files = fs.readdirSync(directory)
    files.forEach(file => {
        if (
            fs.statSync(directory + file).isDirectory() &&
            (directory + file).indexOf('node_modules') === -1 &&
            (directory + file).indexOf('git') === -1
        ) {
            fileList = getAllFiles(directory + file + '/', fileList)
        } else {
            fileList.push(directory + file)
        }
    })
    return fileList
}

let testCount = 0

const directoryFiles = getAllFiles('./')

if (directoryFiles !== undefined) {
    const dotTestDot = /.usd-test.js/
    const testFiles = directoryFiles.filter(file => {
        return file.match(dotTestDot) !== null
    })
    testFiles.forEach(file => {
        try {
            const tests = require(file)
            tests.forEach(test => {
                testCount++
                result = usd(test.usdParams.amount, test.usdParams.includeCents)
                expected = test.expected || undefined
                testDesc = `[${testCount}] ${test.description}`
                try {
                    assert.strictEqual(result, expected)
                    pass(testDesc)
                } catch (e) {
                    fail(testDesc)
                    console.log(`${result} !== ${expected}`)
                    process.exit(1)
                }
            })
        } catch (e) {
            console.error(`
                Problem importing test from file ${file}.
            `)
            console.error(e)
        }
    })
}

/**
 * Exiting...
 */
const end = Date.now()

const time = end - start
console.log(`
    Passing: ${colors.bgGreen.black(`${testCount}/${testCount}`)}

    It took ${colors.bgCyan.black(`${time}ms`)} to run these tests.

    That's ${colors.bgBlack((time / testCount).toFixed(2) + `ms/test`)}.

    Exiting...
`)

process.exit(0)
