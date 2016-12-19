var subHours = require('date-fns/sub_hours')

var models = require('../db/models')

module.exports = getNear

function getNear(params) {
    return models.locations
        .find({
            pos: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [params.lng, params.lat]
                    },
                    $maxDistance : params.rad,
                    spherical: true,
                }
            },
            created_at: { 
                $gte: subHours(new Date(), appropriateHours(params.hours))
            }
            
        })

}

function appropriateHours(hours) {
    return !hours ? 12 : ((hours > 24) ? 24 : hours)
}
