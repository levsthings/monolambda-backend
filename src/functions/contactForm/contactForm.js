'use strict'
const {post} = require('./post')
const {response} = require('./response')

exports.handleMessage = (event, context, callback) => {
    const data = {
        body: JSON.parse(event.body),
        info: event.requestContext.identity.sourceIp
    }
    post(data)
        .then((res) => {
            (res.statusCode === 200)
                ? callback(null, response(200, 'OK'))
                : callback(null, response(400, 'FAIL'))
        })
        .catch((res) => callback(null, response(400, 'FAIL')))
}
