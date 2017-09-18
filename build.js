const fs = require('fs');
const getAllFilesFromDirectory = require('./utils/getAllFilesFromDirectory');
var reader = require('buffered-reader');
var BinaryReader = reader.BinaryReader;
var DataReader = reader.DataReader;

let replacementVariableIndex = 0;

console.log(`Building usd-please...\n\n`);

const srcDirectoryFiles = getAllFilesFromDirectory(`${__dirname}/src/`);

if (srcDirectoryFiles !== undefined) {
    const usdPleaseFile = /src.js/;
    const usdPlease =
        srcDirectoryFiles.filter(file => {
            return file.match(usdPleaseFile) !== null;
        })[0] || undefined;

    if (usdPlease !== undefined) {
        let newContents = '';
        const reader = new DataReader(usdPlease, {
            encoding: 'utf-8'
        })
            .on('error', error => {
                console.error(error);
                console.log(`Problem reading ${usdPlease} file contents...`);
                process.exit(1);
            })
            .on('line', line => {
                if (line !== undefined) {
                    newLine = stripWhitespaceAndNewLine(line);
                    newContents += newLine !== undefined ? `${newLine}` : '';
                }
            })
            .on('end', () => {
                newContents = stripComments(newContents);
                replaceFileContents(newContents);
                console.log(`Reached the end of file ${usdPlease}.`);
                process.exit(0);
            })
            .read();
    }
}

function replaceFileContents(newContents) {
    fs.writeFileSync('./usd-please.js', newContents, error => {
        console.error(error);
        console.log(`Problem writing minified contents to dist file...`);
        process.exit(1);
    });
}

/**
 * Removes comments from file. 
 * @param {string} newFileContents 
 * @returns {string}
 */
function stripComments(newFileContents) {
    const allComments = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/g;
    return newFileContents.replace(allComments, '');
}

/**
 * Called on every line of the source file,
 * removing spaces and newlines from each line. 
 * @param {any} line 
 * @returns 
 */
function stripWhitespaceAndNewLine(line) {
    if (typeof line === 'string') {
        if (line.trim() === '') {
            return undefined;
        }
        const allSpacesAndNewLineCharacters = /[ \n]/g;
        const allVarKeywords = /(var)/g;
        const allReturnKeywords = /(return)/g;
        const allTypeOfKeywords = /(typeof)/g;
        const allElseKeywords = /(elseif)/g;
        line = line.replace(allSpacesAndNewLineCharacters, '');
        line = line.replace(allVarKeywords, 'var ');
        line = line.replace(allReturnKeywords, 'return ');
        line = line.replace(allTypeOfKeywords, 'typeof ');
        line = line.replace(allElseKeywords, 'else if');
        return line || undefined;
    }
    return undefined;
}
