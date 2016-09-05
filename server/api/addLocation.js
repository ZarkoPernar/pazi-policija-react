var Location = require('../db/models').locations

module.exports = add

function add(location) {
    return new Location(location)
}
