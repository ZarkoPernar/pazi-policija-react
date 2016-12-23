var mongoose = require('mongoose')
var db = mongoose.connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://zarko:Kasmir34@ds145178.mlab.com:45178/pazi-policija')

module.exports = db