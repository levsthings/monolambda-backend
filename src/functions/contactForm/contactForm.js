'use strict'
const {postRequest} = require('./post')
const {response} = require('./response')

exports.handleMessage = (event, context, callback) => {
    if (event.source === 'serverless-plugin-warmup') {
        console.log('Thawing lambda...')
        callback(null, 'Lambda is warm!')
    } else {
        try {
            let data = {
                body: JSON.parse(event.body),
                info: event.requestContext.identity.sourceIp
            }
            postRequest(data)
                .then((res) => {
                    (res === 200)
                        ? callback(null, response(200, 'OK'))
                        : callback(null, response(400, 'FAIL'))
                })
                .catch((error) => {
                    console.error(error)
                    callback(null, response(400, 'FAIL'))
                })
        } catch (error) {
            console.error('INVALID DATA', error)
            callback(null, response(400, 'INVALID DATA'))
        }
    }
}
