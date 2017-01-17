var subHours = require('date-fns/sub_hours')

var models = require('../db/models')

module.exports = getNear

const MIN_RAD_DISTANCE = 20000
const MAX_RAD_DISTANCE = 200000

function getNear(params) {
    return models.locations
        .find({
            pos: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [params.lng, params.lat]
                    },
                    $maxDistance : params.rad < MIN_RAD_DISTANCE ? MIN_RAD_DISTANCE : params.rad,
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
