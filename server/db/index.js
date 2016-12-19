var mongoose = require('mongoose')
var db = mongoose.connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/pazipolicija')

module.exports = db