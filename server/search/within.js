var models = require('../db/models')

module.exports = getWithin

function getWithin(params) {
    console.log(Array.isArray(params.corners))
    return models.locations
        .find({
            pos: {
                $geoWithin: {
                    $geometry: {
                        type: 'Polygon',
                        coordinates: [params.corners]
                    },
                }
            },
            // created_at: { 
            //     $gte: subHours(new Date(), 6)
            // }
            
        })

}