const assert = require('assert');
const usd = require('./usd-please');
const colors = require('colors');
const fs = require('fs');
const getAllFilesFromDirectory = require('./utils/getAllFilesFromDirectory');

const pass = desc => console.log(`${desc} ${colors.bgGreen.black(`PASS`)}\n`);
const fail = desc => console.log(`${desc} ${colors.bgRed(`FAIL!`)}`);

const startOfDirectoryWalk = Date.now();

console.log(`${colors.bgYellow.black(`Testing usd-please...\n`)}`);

const directoryFiles = getAllFilesFromDirectory(`${__dirname}/`);
const directoryWalkDuration = Date.now() - startOfDirectoryWalk;

console.log(
    `It took ${colors.bgCyan.black(
        `${directoryWalkDuration}ms`
    )} to find this project's test files.\n`
);

let testCount = 0;
const start = Date.now();
if (directoryFiles !== undefined) {
    const dotTestDot = /.usd-test.js/;
    const testFiles = directoryFiles.filter(file => {
        return file.match(dotTestDot) !== null;
    });
    testFiles.forEach(file => {
        const tests = require(file);
        tests.forEach(test => {
            testCount++;
            result = usd(test.usdParams.amount, test.usdParams.includeCents);
            expected = test.expected || undefined;
            testDesc = `[${testCount}] ${test.description}`;
            try {
                assert.strictEqual(result, expected);
                pass(testDesc);
            } catch (e) {
                fail(testDesc);
                console.log(`${result} !== ${expected}`);
                process.exit();
            }
        });
    });
}

/**
 * Exiting...
 */
const end = Date.now();

const time = end - start;
console.log(`
    Passing: ${colors.bgGreen.black(`${testCount}/${testCount}`)}

    It took ${colors.bgCyan.black(`${time}ms`)} to run these tests.

    That's ${colors.bgBlack((time / testCount).toFixed(2) + `ms/test`)}.

    Exiting...
`);

process.exit(0);
