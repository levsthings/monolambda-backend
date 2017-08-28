'use strict'
const {config} = require('../../config/')
const {postRequest} = require('../../utils/postRequest')

exports.relayMessage = (data) => {
    const relayBody = JSON.stringify({
        channel: config.hookChannel,
        username: config.hookUsername,
        text: `
        ${data.info} has sent us a message\n
        Name: ${data.body.name}\n
        Email: ${data.body.email}\n
        Subject: ${data.body.subject}\n
        Message: ${data.body.message}
        `,
        icon_emoji: config.hookAvatar
    })

    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(relayBody, 'utf8')
    }

    const options = {
        method: 'POST',
        host: config.hookHost,
        path: config.hookPath,
        port: 443,
        headers: headers
    }

    return postRequest(options, relayBody)
}
