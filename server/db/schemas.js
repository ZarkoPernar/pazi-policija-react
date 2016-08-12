var mongoose = require('mongoose');

var location = mongoose.Schema({
    timestamp: Date,
    lat: Number,
    lng: Number,
    user: String,
});

module.exports = { location }
