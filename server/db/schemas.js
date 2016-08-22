var mongoose = require('mongoose')

var location = mongoose.Schema({
    timestamp: Date,
    lat: Number,
    lng: Number,
    user: String,
    modified: Date,
    pos: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [Number]
    }
}, {collection: 'temp'})

module.exports = {
    location
}
