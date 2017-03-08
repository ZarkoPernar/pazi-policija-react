var production = require('./tools/webpack.production')
var development = require('./tools/webpack.development')

const DEV_ENV = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production'

module.exports = function(env) {
    return DEV_ENV ? production(env) : development
} 