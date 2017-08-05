'use strict'
const {config} = require('../../config/')
const rp = require('request-promise')

exports.post = (data) => {
    let options = {
        method: 'POST',
        uri: config.hookURL,
        body: {
            channel: '#_test-lab_',
            username: 'Cactus',
            text: `${data.info} has sent us a message\n Name: ${data.body.name}\n Email: ${data.body.email}\n Subject: ${data.body.subject}\n Message: ${data.body.message}`,
            icon_emoji: ':cactus:'
        },
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        resolveWithFullResponse: true
    }
    return rp(options)
}
