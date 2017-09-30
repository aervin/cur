const fs = require("fs")
const getAllFilesFromDirectory = require("./utils/getAllFilesFromDirectory")
const prettier = require("prettier")
const uglify = require("uglify-js")

console.log(`Building cur...\n`)

const srcDirectoryFiles = getAllFilesFromDirectory(`${__dirname}/src/`)
if (srcDirectoryFiles !== undefined) {
    const curFile = /src.js/
    const cur =
        srcDirectoryFiles.filter(file => {
            return file.match(curFile) !== null
        })[0] || undefined

    if (cur !== undefined) {
        /** Add semicolons to source before minifying */
        let sourceFile = prettier.format(
            fs.readFileSync(cur, { encoding: "utf-8" }),
            {
                semi: true
            }
        )

        /** Minify */
        sourceFile = uglify.minify([sourceFile])
        console.log("Successfully minified cur...\n")

        /** Write contents to file */
        replaceFileContents(sourceFile.code)
        console.log("Successfully wrote contents to cur...\n")
        process.exit(0)
    }
}

function replaceFileContents(newContents) {
    fs.writeFileSync("./cur.js", newContents, error => {
        console.error(error)
        console.log(`Problem writing minified contents to dist file...`)
        process.exit(1)
    })
}
