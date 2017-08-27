'use strict'
const {relayMessage} = require('./relayMessage')
const {clientResponse} = require('./clientResponse')

exports.handleMessage = (event, context, callback) => {
    if (event.source === 'serverless-plugin-warmup') {
        console.log('Thawing lambda...')
        context.succeed()
    } else {
        try {
            const data = {
                body: JSON.parse(event.body),
                info: event.requestContext.identity.sourceIp
            }
            relayMessage(data)
                .then(res =>
                    (res === 200)
                        ? callback(null, clientResponse(200, 'OK'))
                        : callback(null, clientResponse(400, 'FAIL'))
                )
                .catch((error) => {
                    console.error(error)
                    callback(null, clientResponse(400, 'FAIL'))
                })
        } catch (error) {
            console.error('INVALID DATA', error)
            callback(null, clientResponse(400, 'INVALID DATA'))
        }
    }
}
