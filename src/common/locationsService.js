import http from '../common/http'
import AppStore from '../AppStore'

export default {
    url: '/api/v1',
    
    /**
     * listAll	returns all locations
     * @return {location[]}
     */
    listAll(params) {
        return http.post(this.url + '/locations/near', params)
        .then(res => res.json())
        .then(data => {           
            if (data.code === 2) {
                return new Error('Damn')
            }            
            return data
        })
        .catch((err) => { throw err })
    },
    geocode(params) {
        return http(this.url + '/locations/geocode', {                        
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(params)
        })
        .then(res => res.json())
        .then((data) => {
            // TODO
            // AppStore.dispatch({
            //     type: 'GEOCODE_RESULT',
            //     payload: data,
            // })
            
            return data
        })
    },
    addLocation(location) {
        return http(this.url + '/locations/add', {                        
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(location)
        })
        .then(res => res.json())
        .then((res) => {
            AppStore.dispatch({
                type: 'ADD_ITEM',
                payload: res
            })
            return res
        })
    },
    updateLocation(location) {
        return http(this.url + '/locations/update', {                        
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(location)
        })
        .then(res => res.json())        
    },
}
