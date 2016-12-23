var production = require('./production')
var development = require('./development')

const DEV_ENV = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production'

module.exports = DEV_ENV ? production : development