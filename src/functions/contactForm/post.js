'use strict'
const {config} = require('../../config/')
const request = require('superagent')

exports.post = (data) => {
    let relay = {
        uri: config.hookURL,
        body: {
            channel: '#_test-lab_',
            username: 'Cactus',
            text: `${data.info} has sent us a message\n Name: ${data.body.name}\n Email: ${data.body.email}\n Subject: ${data.body.subject}\n Message: ${data.body.message}`,
            icon_emoji: ':cactus:'
        }
    }
    return request
        .post(relay.uri)
        .set('Content-Type', 'application-json')
        .send(JSON.stringify(relay.body))
}
