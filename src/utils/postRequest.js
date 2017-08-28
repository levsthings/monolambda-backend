const https = require('https')

exports.postRequest = (options, body) => {
    return new Promise((resolve, reject) => {
        const post = https.request(options, res =>
            (res.statusCode !== 200)
                ? reject(new Error('POST request failed.'))
                : resolve(res.statusCode)
        )
        post.write(body)
        post.on('error', err => reject(new Error(err)))
        post.end()
    })
}
