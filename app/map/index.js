import React from 'react'
import mapService from '../common/mapService.js'

let mapStyle = {
    height: '75vh', //window.innerHeight + 'px', //'100vh',
}

class Map extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        initMap()
    }
    render() {
        return (
            <div style={mapStyle} className="box" id="gmap-container">Responsive</div>
        )
    }
}

export default Map

function initMap() {
    const map = new google.maps.Map(document.getElementById('gmap-container'), {
        zoom: 12,
        center: {
            lat: 44.8,
            lng: 14.9
        }
    })

    map.addListener('click', (e) => {
        mapService.mapClick(e)
    })
}
