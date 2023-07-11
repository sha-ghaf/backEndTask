const allowedOrigins = require('./allowedOrigins.js')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not Allowed by cors'))
        }
    },
    Credential: true
}

module.exports = corsOptions