var Location = require('../db/models').locations

module.exports = addLocation

function addLocation(req, res) {
    let location
    let {
        lat,
        lng,
        google_address,
        description,
    } = req.body

    if (!req.body) {
        return res.json({
            error: {
                message: 'Required search parameters missing',
                required_parameters: ['lat', 'lng'],
                optional_parameters: ['google_address', 'description'],
            }
        })
    }

    location = new Location({
        timestamp: new Date(),
        lat: lat,
        lng: lng,
        google_address: google_address,
        description: description,
        user: 'Admin',
        modified: new Date(),
        created_at: new Date(),
        pos: {
            type: 'Point',
            coordinates: [lng, lat]
        }
    })

    location.save(function (err) {
        if (err) return res.json(err)
        
        res.json('Success')
    })

    
}
