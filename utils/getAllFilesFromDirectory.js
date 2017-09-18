const fs = require('fs')

const getAllFiles = function(directory = __dirname, fileList = []) {
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

module.exports = getAllFiles
