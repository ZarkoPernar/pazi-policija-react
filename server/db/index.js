var mongoose = require('mongoose')
const bluebird = require('bluebird')

mongoose.Promise = bluebird
mongoose.set('debug', JSON.parse(process.env.MONGO_DEBUG))
mongoose.connect(process.env.MONGO_URL)

module.exports = mongoose.connection