const fs = require('fs')
const logFileName = 'log.txt'

function info (log) {
    fs.appendFile(logFileName,'INFO: ' + log + '\n', (err) => {
        if (err){
            throw err
        }
    })
}
function error (log) {
    fs.appendFile(logFileName,'ERROR: ' + log + '\n', (err) => {
        if (err){
            throw err
        }
    })
}

module.exports = {
    info: info,
    error: error
}