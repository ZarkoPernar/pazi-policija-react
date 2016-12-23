import store from './mapStore'
import AppStore from '../AppStore'

export default {
    /**
     * listAll	returns all locations
     * @return {location[]}
     */
    listAll(params) {
        return fetch('/api/v1/locations/near', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(params)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
            if (data.code === 2) {
                return new Error('Damn')
            }
            store.dispatch('list_loaded', data)

            AppStore.dispatch({
                type: 'ADD_ITEMS',
                payload: data,
            })
            
            return data
        })
        .catch((err) => err)
    },
    geocode(params) {
        return fetch('/api/v1/locations/geocode', {
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
        console.log(location)
        return fetch('/api/v1/locations/add', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(location)
        })
        .then(res => res.json())
    },
    updateLocation(location) {
        return fetch('/api/v1/locations/update', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(location)
        })
        .then(res => res.json())        
    },
}
