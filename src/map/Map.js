import { Component, h } from 'preact'
import debounce from 'lodash/debounce'

require('./map.scss')

import AppStore from '../AppStore'
import distance from '../utils/measureDistance'
import store from '../common/mapStore'
import locationsService from '../common/locationsService'
import places from '../google-places/googlePlacesService'

import CenterMap from './CenterMap'

import { getRadius, USING_RADIUS } from './utils/getRadius'
import { getDistance } from './utils/getDistance'
import { getCorners } from './utils/getCorners'

import autocompleteSelectActions from '../actionCreators/autocompleteSelect'

const initMap = window.initMap


class Map extends Component {
    constructor() {
        super()

        this._centerLocation = null
        this.searchParams = {}

        this.addMapRef = this.addMapRef.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this.initMap = this.initMap.bind(this)
        this._addMarkers = this._addMarkers.bind(this)
        this._createMarker = this._createMarker.bind(this)
        this.getLocations = this.getLocations.bind(this)
        this._setSearchLocation = this._setSearchLocation.bind(this)

        this._unregisterMap = initMap.addListener(this.initMap.bind(this))
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedAutocompleteItem !== prevProps.selectedAutocompleteItem) {
            if (this._centerLocation) {
                this._centerLocation.marker.setMap(null)
                this._centerLocation = null
            }

            this._setSearchLocation(this.props.selectedAutocompleteItem.geometry.location, this.props.selectedAutocompleteItem)  
        }

                             
    }

    componentWillUnmount() {
        this._unregisterMap()
    }

    getLocations() {
        locationsService.listAll({
            lat: this.searchParams.lat || this.props.mapParams.center.lat,
            lng: this.searchParams.lng || this.props.mapParams.center.lng,
            rad: this.searchParams.rad || this.props.mapParams.rad,
        })
    }

    addMapRef(el) {
        this.mapElement = el

        if (!this._map && window.google && window.google.maps) {
            this.initMap()
        }
    }

    initMap() {
        if (!this.mapElement) return
        
        let tempCenter
        this._map = new google.maps.Map(this.mapElement, {
            zoom: this.props.mapParams.zoom,
            center: this.props.mapParams.center,
        })

        this.icon = {
            path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
            fillColor: '#4285F4',
            fillOpacity: .6,
            anchor: new google.maps.Point(0,0),
            strokeWeight: 0,
            scale: 1
        }

        places.init(this._map)

        this.getLocationsDebounced = debounce(this.getLocations, 1000)    

        this.getLocations()  

        this._map.addListener('bounds_changed', () => {
            this._bounds = this._map.getBounds()
            tempCenter = this._map.getCenter()
            this.searchParams = {
                lat: tempCenter.lat(),
                lng: tempCenter.lng(),
                rad: parseInt(getDistance(this._map.getCenter(), this._bounds.getSouthWest()))
            }
            
            this.getLocationsDebounced()
        })              

        this._map.addListener('click', (e) => {
            if (!this.props.waitForMapClick) {
                return
            }
            locationsService.geocode({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            }).then((res) => {
                console.log(res)
                res[0].geometry = {
                    location: e.latLng,
                }

                AppStore.dispatch(
                    autocompleteSelectActions.select(
                        res[0]
                    )
                )
                this.props.toggleWaitForMapClick()
                store.dispatch('google_map_selected', res[0])
                store.dispatch('google_autocomplete_selected', res[0])
            })            
        })

        // this._map.addListener('zoom_changed', (e) => {
        //     // TODO
        //     // console.log({
        //     //     radius: getRadius(this._map) + USING_RADIUS,
        //     // })
        // })

        // store.subscribe('google_autocomplete_selected', (place) => {   
        //     if (this._centerLocation) {
        //         this._centerLocation.marker.setMap(null)
        //         this._centerLocation = null
        //     }

        //     this._setSearchLocation(place.geometry.location, place)            
        // })

        store.subscribe('list_loaded', this._addMarkers)
    }
    _addMarkers(data) {
        this._locations = data.map(this._createMarker)
    }

    _createMarker(location) {
        return {
            _id: location._id,
            marker: new google.maps.Marker({
                position: getPosition(location),
                map: this._map,
                title: location.google_address,
            })
        }
    }

    _setSearchLocation(location, place) {
        this._map.setZoom(16)
        this._map.panTo(location)

        this._centerLocation = {
            marker: new google.maps.Marker({
                position: location,
                animation: google.maps.Animation.DROP,
                map: this._map,
                icon: this.icon,
            })
        }
    }

    render({mapParams}) {
        return (
            <div className="map-container">
                <CenterMap key="mapCenter" center={mapParams.center} map={this._map}/>
                <div key="map" className="map-element" ref={this.addMapRef}></div>
            </div>
            
        )
    }
}

export default Map

function getPosition(pos) {
    if (pos instanceof google.maps.LatLng) {
        return {
            lat: pos.lat(),
            lng: pos.lng(),
        }
    }
    return {
        lat: pos.lat,
        lng: pos.lng,
    }

}
