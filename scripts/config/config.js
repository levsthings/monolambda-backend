'use strict'
const {logError, logNotify, logSuccess, parseJson} = require('../utils/common')

let config

try {
    config = parseJson('./scripts/config/config.json', 'utf8')
    logSuccess(`Local key/value pair for S3 connection found successfuly.`)
} catch (err) {
    (process.env.KEY_ID && process.env.ACCESS_KEY)
        ? logNotify(`There's no local key/value pair for S3 connection, environment variables will be used.`)
        : logError(`There's no local key value/pair for and no environment variables for S3 connection, upload aborted`)
}

exports.KEY_ID = process.env.KEY_ID || config.accessKeyId
exports.ACCESS_KEY = process.env.ACCESS_KEY || config.secretAccessKey