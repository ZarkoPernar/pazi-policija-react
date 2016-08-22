var models = require('../db/models')

module.exports = getNear

function getNear(coords) {
    return models.locations
        .find({
            pos: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates:[coords.lng, coords.lat]
                    },
                    $maxDistance : coords.rad,
                    spherical: true,
                }
            }
        })

}
