'use strict'
exports.response = (statusCode, message) => {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
            status: message
        })
    }
}
