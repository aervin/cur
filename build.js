const fs = require('fs')
const getAllFilesFromDirectory = require('./utils/getAllFilesFromDirectory')
const prettier = require('prettier')
const uglify = require('uglify-js')

console.log(`Building usd-please...\n`)

const srcDirectoryFiles = getAllFilesFromDirectory(`${__dirname}/src/`)
if (srcDirectoryFiles !== undefined) {
    const usdPleaseFile = /src.js/
    const usdPlease =
        srcDirectoryFiles.filter(file => {
            return file.match(usdPleaseFile) !== null
        })[0] || undefined

    if (usdPlease !== undefined) {
        /** Add semicolons to source before minifying */
        let sourceFile = prettier.format(
            fs.readFileSync(usdPlease, { encoding: 'utf-8' }),
            {
                semi: true
            }
        )

        /** Minify */
        sourceFile = uglify.minify([sourceFile])
        console.log('Successfully minified usd-please...\n')

        /** Write contents to file */
        replaceFileContents(sourceFile.code)
        console.log('Successfully wrote contents to usd-please.js...\n')
        process.exit(0)
    }
}

/**
 * Adds spaces around keywords which require it.
 * @param {string} source 
 * @returns {string}
 */
function addSpacesAroundKeywords(source) {
    if (source !== undefined && typeof source === 'string') {
        const regexps = {
            var: /(var)/g,
            return: /(return)/g,
            typeof: /(typeof)/g,
            else_if: /(elseif)/g
        }
        for (const expressionKey of Object.keys(regexps)) {
            source = source.replace(
                regexps[expressionKey],
                expressionKey.replace(/_/g, ' ') + ' '
            )
        }
        return source || undefined
    }
    return undefined
}

function replaceFileContents(newContents) {
    fs.writeFileSync('./usd-please.js', newContents, error => {
        console.error(error)
        console.log(`Problem writing minified contents to dist file...`)
        process.exit(1)
    })
}

/**
 * Parse entire sourcefile, removing comments. 
 * @param {string} source 
 * @returns {string}
 */
function stripComments(source) {
    if (source !== undefined && typeof source === 'string') {
        const allComments = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/g
        return source.replace(allComments, '')
    }
    return undefined
}

/**
 * Parse entire sourcefile, removing spaces
 * and newline characters.
 * @param {string} source 
 * @returns 
 */
function stripWhitespaceAndNewLine(source) {
    if (source !== undefined && typeof source === 'string') {
        if (source.trim() === '') {
            return undefined
        }
        const allSpacesAndNewLineCharacters = /[ \n]/g
        source = source.replace(allSpacesAndNewLineCharacters, '')
        return source || undefined
    }
    return undefined
}
