const search = require('../search/near')

module.exports = apiLocations

function apiLocations(req, res) {
    if (!req.body) {
        res.json({error: 'Epic Fail!'})
    } else {
        console.log(req.body)

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
