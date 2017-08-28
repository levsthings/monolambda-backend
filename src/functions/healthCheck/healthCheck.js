'use strict'
const {postRequest} = require('../../utils/postRequest')
const {clientResponse} = require('../contactForm/clientResponse')

exports.handleHealthCheck = (event, context, callback) => {
    const body = JSON.stringify({
        ping: 'OK?'
    })
    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body, 'utf8')
    }
    const options = {
        method: 'POST',
        host: 'cactus.monolambda.com',
        path: '/contact-form',
        port: 443,
        headers: headers
    }
    postRequest(options, body)
        .then(() => callback(null, clientResponse(200, 'OK')))
        .catch((error) => {
            console.error(error)
            callback(null, clientResponse(400, 'FAIL'))
        })
}
