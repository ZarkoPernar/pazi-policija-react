import AppStore from '../AppStore'
import { URL } from './urlService'

export default {
    url: URL + '/api/v1',
    
    /**
     * listAll	returns all locations
     * @return {location[]}
     */
    listAll(params) {
        return fetch(this.url + '/locations/near', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(params)
        })
        .then(res => res.json())
        .then(data => {           
            if (data.code === 2) {
                return new Error('Damn')
            }

            AppStore.dispatch({
                type: 'ADD_ITEMS',
                payload: data,
            })
            
            return data
        })
        .catch((err) => err)
    },
    geocode(params) {
        return fetch(this.url + '/locations/geocode', {
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
        return fetch(this.url + '/locations/add', {
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
        return fetch(this.url + '/locations/update', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(location)
        })
        .then(res => res.json())        
    },
}
