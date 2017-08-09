'use strict'
const {postRequest} = require('./post-two')
const {response} = require('./response')

exports.handleMessage = (event, context, callback) => {
    const data = {
        body: JSON.parse(event.body),
        info: event.requestContext.identity.sourceIp
    }
    postRequest(data)
        .then((res) => {
            (res === 'ok')
                ? callback(null, response(200, 'OK'))
                : callback(null, response(400, 'FAIL'))
        })
        .catch((res) => {
            callback(null, response(400, 'FAIL'))
        })
}
