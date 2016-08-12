var mongoose = require('mongoose');
var schemas = require('./schemas');

module.exports = {
    locations: mongoose.model('location', schemas.location),
}
