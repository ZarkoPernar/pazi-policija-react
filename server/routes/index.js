const PREFIX = '/api'
const API_VERSION = 'v1'

module.exports = {
    ADD: PREFIX + '/' + API_VERSION + '/locations/add',
    NEAR: PREFIX + '/' + API_VERSION + '/locations/near',
    GEOCODE: PREFIX + '/' + API_VERSION + '/locations/geocode',
}
