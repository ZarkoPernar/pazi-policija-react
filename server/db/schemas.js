var mongoose = require('mongoose');

var spell = mongoose.Schema({
    name: String,
    school: String,
    range: String,
    description: String,
}, { collection: 'spells'});

module.exports = { spell }
