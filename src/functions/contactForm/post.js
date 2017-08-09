'use strict'
const https = require('https')
const {config} = require('../../config/')

exports.postRequest = (data) => {
    const relay = JSON.stringify({
        channel: '#_test-lab_',
        username: 'Cactus',
        text: `${data.info} has sent us a message\n Name: ${data.body.name}\n Email: ${data.body.email}\n Subject: ${data.body.subject}\n Message: ${data.body.message}`,
        icon_emoji: ':cactus:'
    })

    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(relay, 'utf8')
    }

    const options = {
        method: 'POST',
        host: config.hookHost,
        path: config.hookPath,
        port: 443,
        headers: headers
    }

    return new Promise((resolve, reject) => {
        const post = https.request(options, (res) => {
            if (res.statusCode !== 200) reject(new Error('Response not OK.'))
            let body = []

            res.on('data', (data) => {
                body.push(data)
            })

            res.on('end', () => {
                try {
                    let parsedResponse = Buffer.concat(body).toString()
                    resolve(parsedResponse)
                } catch (err) {
                    reject(err)
                }
            })
        })

        post.write(relay)
        post.on('error', (err) => reject(err))
        post.end()
    })
}
