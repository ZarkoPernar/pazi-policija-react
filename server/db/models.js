var mongoose = require('mongoose');
var schemas = require('./schemas');

module.exports = {
    spells: mongoose.model('spell', schemas.spell),
}
