var mongoose = require('mongoose')

var location = mongoose.Schema({
    timestamp: Date,
    description: String,
    google_address: String,
    lat: Number,
    lng: Number,
    user: String,
    modified: Date,
    created_at: Date,
    pos: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [Number]
    }
}, {collection: 'temp'})

location.index({ pos: '2dsphere' })

module.exports = {
    location
}
