import React from 'react'
import mapStore from '../common/mapStore'


class ListOptions extends React.Component {
    constructor(props) {
        super(props)

        mapStore.subscribe('google_autocomplete_selected', (place) => {

        })
        mapStore.subscribe('google_map_selected', (place) => {
            this.selectedLocation = place
        })
    }   

    render({waitForMapClick, toggleWaitForMapClick}) {
        return (
            <div>
                <button onClick={toggleWaitForMapClick}>
                    {waitForMapClick ? 'Wait For The Click' : 'Click on the map'}
                </button>
            </div>
        )
    }
}

export default ListOptions
