import React from 'react'
import mapService from '../common/mapService.js'
import mapStore from '../common/mapStore.js'
import distance from '../utils/measureDistance'
import service from '../common/locationsService'
import store from '../common/mapStore'
import places from '../google-places/googlePlacesService'

let map
let markers
let mapCenter = {
    lat: 45.815399,
    lng: 15.966568
}

let mapStyle = {
    height: '75vh', //window.innerHeight + 'px', //'100vh',
}

mapStore.subscribe(addMarkers)

class Map extends React.Component {
    constructor() {
        super()
    }
    // componentWillReceiveProps: function(nextProps) {
    //     this.setState({
    //         likesIncreasing: nextProps.likeCount > this.props.likeCount
    //     })
    // }
    componentDidMount() {
        let params = Object.assign({}, mapCenter)

        initMap()

        service.listAll(params).then(res => res.json()).then(data => {
            store.dispatch(data)
            this.setState({list: data})
        })

        // map.addListener(map, 'idle', function() {
        //     params.rad = distance(
        //         new google.maps.LatLng(mapCenter.lat, mapCenter.lng),
        //         new google.maps.LatLng(map.getBounds().getNorthEast())
        //     )
        //
        //     service.listAll(params).then(res => res.json()).then(data => {
        //         store.dispatch(data)
        //         this.setState({list: data})
        //     })
        // })
    }

    render() {
        return (
            <div style={mapStyle} className="box" id="gmap-container">Responsive</div>
        )
    }
}

export default Map


function addMarkers(data) {
    markers = data.map(createMarker)
}

function createMarker(location) {
    return new google.maps.Marker({
        position: getPosition(location),
        map: map,
        title: location.google_address,

    })
}

function getPosition(pos) {
    return {
        lat: pos.lat,
        lng: pos.lng,
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('gmap-container'), {
        zoom: 9,
        center: mapCenter,
    })

    places.init(map)

    map.addListener('click', (e) => {
        mapService.mapClick(e)
    })
}
