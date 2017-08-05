'use strict'
const {post} = require('./post')

exports.handleMessage = (event, context, callback) => {
    const data = {
        body: JSON.parse(event.body),
        info: event.requestContext.identity.sourceIp
    }
    const success = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
            status: 'OK'
        })
    }
    const fail = {
        statusCode: 400,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
            status: 'FAIL'
        })
    }
    post(data)
        .then((res) => {
            (res.statusCode === 200)
                ? callback(null, success)
                : callback(null, fail)
        })
        .catch((res) => callback(null, fail))
}
