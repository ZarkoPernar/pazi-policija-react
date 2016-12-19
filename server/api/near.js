const search = require('../search/near')

module.exports = getNearbyLocations

function getNearbyLocations(req, res) {
    if (!req.body) {
        res.json({error: 'Epic Fail!'})
    } else {
        console.log('near: ', req.body)

        search(req.body)
            .then(callbackSuccess, callbackError)
    }

    function callbackSuccess(list) {
        res.json(list)
    }

    function callbackError(err) {
        res.json(err)
    }
}
