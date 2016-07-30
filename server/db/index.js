var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pathfinder');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});
