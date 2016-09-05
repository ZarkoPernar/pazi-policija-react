import React from 'react'
import mapService from '../common/mapService.js'
import distance from '../utils/measureDistance'
import service from '../common/locationsService'
import store from '../common/mapStore'
import places from '../google-places/googlePlacesService'

let mapCenter = {
    lat: 45.815399,
    lng: 15.966568
}

let mapStyle = {
    height: '75vh', //window.innerHeight + 'px', //'100vh',
}



class Map extends React.Component {
    constructor() {
        super()

        this._initMap = this._initMap.bind(this)
        this._addMarkers = this._addMarkers.bind(this)
        this._createMarker = this._createMarker.bind(this)
    }
    // componentWillReceiveProps: function(nextProps) {
    //     this.setState({
    //         likesIncreasing: nextProps.likeCount > this.props.likeCount
    //     })
    // }

    _initMap() {
        let params = Object.assign({}, mapCenter)

        this._map = new google.maps.Map(document.getElementById('gmap-container'), {
            zoom: 9,
            center: mapCenter,
        })

        places.init(this._map)

        this._map.addListener('click', (e) => {
            mapService.mapClick(e)
        })

        service.listAll(params).then(res => res.json()).then(data => {
            store.dispatch('list_loaded', data)
            this.setState({list: data})
        })

        store.subscribe('center_on', (pos) => {
            this._map.setZoom(16)
            this._map.setCenter(pos)
            this._createMarker({
                lat: pos.lat(),
                lng: pos.lng(),
                title: 'lll'
            })
        })

        store.subscribe('list_loaded', this._addMarkers)
    }
    _addMarkers(data) {
        this._markers = data.map(this._createMarker)
    }

    _createMarker(location) {
        return new google.maps.Marker({
            position: getPosition(location),
            map: this._map,
            title: location.google_address,

        })
    }
    componentDidMount() {
        this._initMap()
    }

    render() {
        return (
            <div style={mapStyle} className="box" id="gmap-container">Responsive</div>
        )
    }
}

export default Map

function getPosition(pos) {
    return {
        lat: pos.lat,
        lng: pos.lng,
    }

}
